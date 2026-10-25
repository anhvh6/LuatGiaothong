import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {generateExam,grade} from './lib/exam.mjs';
import {updateBank} from './lib/updater.mjs';
const ROOT=import.meta.dirname,publicDir=path.join(ROOT,'public');
const port=Number(process.env.PORT)||3000;
const sessions=new Map();let updating=false;
const json=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data))};
const load=async()=>{const bank=JSON.parse(await readFile(path.join(ROOT,'data/bank.json'),'utf8'));bank.questions.forEach(q=>q.sourceHash=bank.sha256);return bank};
async function body(req){let s='';for await(const b of req){s+=b;if(s.length>100000)throw Error('Yêu cầu quá lớn.')}return JSON.parse(s||'{}')}
function publicQuestion(q,reveal=false){const {correct,...safe}=q;return reveal?q:safe}
export const server=http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');const route=url.pathname;
    if(req.method==='POST'){
      const origin=req.headers.origin;
      if(origin&&!([`http://localhost:${port}`,`http://127.0.0.1:${port}`].includes(origin)))return json(res,403,{error:'Nguồn yêu cầu không hợp lệ.'});
      if(req.headers['x-app-request']!=='duong-thong')return json(res,403,{error:'Thiếu mã xác nhận yêu cầu.'});
    }
    if(route==='/api/data'&&req.method==='GET'){
      const bank=await load();let status={};try{status=JSON.parse(await readFile(path.join(ROOT,'data/update-status.json'),'utf8'))}catch{}
      return json(res,200,{version:bank.version,updatedAt:bank.updatedAt,total:bank.questions.length,critical:bank.questions.filter(q=>q.critical).length,illustrated:bank.questions.filter(q=>q.images.length).length,questions:bank.questions.map(q=>publicQuestion(q)),sources:JSON.parse(await readFile(path.join(ROOT,'data/sources.json'),'utf8')),status});
    }
    if(route==='/api/exams'&&req.method==='POST'){
      const opts=await body(req);const bank=await load();const exam=generateExam(bank.questions,opts);const id=randomUUID();
      const session={...exam,answers:{},checked:{},id,startedAt:Date.now(),deadline:Date.now()+exam.minutes*60000,finished:false};sessions.set(id,session);
      return json(res,200,{...session,questions:session.questions.map(q=>publicQuestion(q))});
    }
    const match=route.match(/^\/api\/exams\/([a-f0-9-]+)(?:\/(answer|finish))?$/);
    if(match){
      const session=sessions.get(match[1]);if(!session)return json(res,404,{error:'Phiên làm bài không còn tồn tại. Hãy tạo bài mới.'});
      const action=match[2];
      if(action==='answer'&&req.method==='POST'){
        if(session.finished||Date.now()>session.deadline)return json(res,409,{error:'Bài thi đã kết thúc hoặc hết giờ.'});
        const {id,answer,check}=await body(req),q=session.questions.find(q=>q.id===id);
        if(!q||!Number.isInteger(answer)||answer<0||answer>=q.options.length)return json(res,400,{error:'Đáp án không hợp lệ.'});
        if(session.mode==='practice'&&session.checked[id])return json(res,409,{error:'Câu đã trả lời và xem đáp án.'});
        session.answers[id]=answer;
        if(session.mode==='practice'&&check!==false){session.checked[id]=true;return json(res,200,{correct:q.correct,isCorrect:answer===q.correct,explanation:q.options[q.correct],page:q.page})}
        return json(res,200,{saved:true});
      }
      if(action==='finish'&&req.method==='POST'){
        session.finished=true;
        return json(res,200,{...grade(session.questions,session.answers,session.threshold),answers:session.answers,questions:session.questions,elapsed:Math.min(Date.now()-session.startedAt,session.minutes*60000),preset:session.preset});
      }
      if(!action&&req.method==='GET')return json(res,200,{...session,questions:session.questions.map(q=>publicQuestion(q,session.finished))});
    }
    if(route==='/api/update'&&req.method==='POST'){
      if(updating)return json(res,409,{error:'Đang có một lượt cập nhật. Vui lòng chờ.'});
      updating=true;try{return json(res,200,await updateBank())}finally{updating=false}
    }
    if(route==='/api/source.pdf'){
      const bank=await load(),sha=url.searchParams.get('sha');
      if(sha&&!/^[a-f0-9]{64}$/.test(sha))return json(res,400,{error:'Mã tài liệu không hợp lệ.'});
      const relative=sha&&sha!==bank.sha256?'documents/'+sha+'.pdf':bank.pdfFile||'official-600.pdf';
      const pdf=await readFile(path.join(ROOT,'data',relative));res.writeHead(200,{'Content-Type':'application/pdf'});return res.end(pdf)
    }
    if(route.startsWith('/api/'))return json(res,404,{error:'Không tìm thấy API.'});
    const file=path.resolve(publicDir,'.'+decodeURIComponent(route==='/'?'/index.html':route));
    if(!file.startsWith(publicDir+path.sep))return json(res,403,{error:'Đường dẫn không hợp lệ.'});
    const info=await stat(file);if(!info.isFile())return json(res,404,{error:'Không tìm thấy tệp.'});
    const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.json':'application/json; charset=utf-8'};
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache'});res.end(await readFile(file));
  }catch(error){json(res,error.code==='ENOENT'?404:400,{error:error.code==='ENOENT'?'Không tìm thấy dữ liệu.':error.message})}
});
setInterval(()=>{for(const [id,s]of sessions)if(Date.now()-s.startedAt>24*3600000)sessions.delete(id)},3600000).unref();
server.listen(port,'127.0.0.1',()=>console.log(`Đường Thông sẵn sàng tại http://localhost:${port}`));
