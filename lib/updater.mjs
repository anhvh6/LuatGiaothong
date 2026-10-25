import {readFile,writeFile,mkdir,rename,rm,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawn} from 'node:child_process';
import {existsSync} from 'node:fs';
import path from 'node:path';
const ROOT=process.env.VERCEL==='1'?process.cwd():path.resolve(import.meta.dirname,'..');
export async function updateBank(){
  const config=JSON.parse(await readFile(path.join(ROOT,'data/sources.json'),'utf8'));
  const url=new URL(config.questionPdf);
  if(url.protocol!=='https:')throw Error('Nguồn PDF phải dùng HTTPS.');
  const res=await fetch(url,{signal:AbortSignal.timeout(30000)});
  if(!res.ok)throw Error(`Nguồn tải trả về HTTP ${res.status}.`);
  const chunks=[];let size=0;
  for await(const chunk of res.body){size+=chunk.length;if(size>30*1024*1024)throw Error('Tài liệu vượt giới hạn 30 MB.');chunks.push(chunk)}
  const buffer=Buffer.concat(chunks);
  if(buffer.subarray(0,5).toString()!=='%PDF-')throw Error('Nguồn không trả về tài liệu PDF.');
  const sha=createHash('sha256').update(buffer).digest('hex');
  const bank=JSON.parse(await readFile(path.join(ROOT,'data/bank.json'),'utf8'));
  const checkedAt=new Date().toISOString();
  if(process.env.VERCEL==='1')return {checkedAt,changed:false,available:sha!==bank.sha256,message:sha===bank.sha256?'Đã tải và đối chiếu PDF: nguồn chưa thay đổi.':'Nguồn PDF đã thay đổi. Cần chạy cập nhật ở localhost, kiểm chứng dữ liệu rồi đẩy lên GitHub để Vercel triển khai lại. Bản đang học được giữ nguyên.'};
  if(sha===bank.sha256){const status={checkedAt,changed:false,message:'Đã tải và đối chiếu tài liệu trên mạng: nguồn cấu hình chưa có thay đổi. Lý thuyết và mẹo được biên tập riêng; xem nguồn để kiểm tra văn bản mới.'};await writeFile(path.join(ROOT,'data/update-status.json'),JSON.stringify(status));return status;}
  const stage=path.join(ROOT,'data/staging',sha);await mkdir(stage,{recursive:true});
  const pdf=path.join(stage,'source.pdf'),output=path.join(stage,'bank.json');
  await writeFile(pdf,buffer);
  const bundled=path.join(process.env.USERPROFILE||'','.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe');
  const python=process.env.PYTHON_BIN||(existsSync(bundled)?bundled:'python');
  const imageDir=path.join(ROOT,'public/images',sha);
  try{
    await new Promise((resolve,reject)=>{const child=spawn(python,[path.join(ROOT,'scripts/extract_pdf.py'),pdf,output,imageDir],{windowsHide:true,env:{...process.env,PYTHONIOENCODING:'utf-8'}});let err='';child.stderr.on('data',d=>err+=d);child.on('error',reject);const timeout=setTimeout(()=>{child.kill();reject(Error('Quá thời gian kiểm tra PDF (3 phút).'))},180000);child.on('close',code=>{clearTimeout(timeout);code===0?resolve():reject(Error('Không thể xác thực bộ câu hỏi mới. Giữ nguyên dữ liệu cũ. '+err.slice(-300)))});});
    const next=JSON.parse(await readFile(output,'utf8'));
    if(next.questions.length!==600||next.questions.some(q=>!Number.isInteger(q.correct)))throw Error('Bộ dữ liệu mới không đạt kiểm tra.');
    next.sourceUrl=config.questionPdf;
    next.questions.forEach(q=>q.images=q.images.map(im=>im.replace('/images/','/images/'+sha+'/')));
    await mkdir(path.join(ROOT,'data/documents'),{recursive:true});
    // Keep the precise original PDF for old exams and their page links.
    const oldPdf=path.join(ROOT,'data',bank.pdfFile||'official-600.pdf');
    const archivedPdf=path.join(ROOT,'data/documents',bank.sha256+'.pdf');
    if(existsSync(oldPdf)&&path.resolve(oldPdf)!==path.resolve(archivedPdf))await copyFile(oldPdf,archivedPdf);
    next.pdfFile='documents/'+sha+'.pdf';
    await copyFile(pdf,path.join(ROOT,'data',next.pdfFile));
    await writeFile(output,JSON.stringify(next));
    await writeFile(path.join(ROOT,'data/bank.backup.json'),JSON.stringify(bank));
    await rename(output,path.join(ROOT,'data/bank.json'));
    const status={checkedAt,changed:true,message:'Đã tải và xác thực lại 600 câu hỏi, đáp án và hình ảnh. Bản trước đã được sao lưu. Cấu trúc đề và mẹo cần đối chiếu riêng nếu có văn bản mới.'};
    await writeFile(path.join(ROOT,'data/update-status.json'),JSON.stringify(status));return status;
  }finally{await rm(stage,{recursive:true,force:true});}
}
