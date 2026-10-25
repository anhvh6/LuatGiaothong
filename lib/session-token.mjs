import {createCipheriv,createDecipheriv,randomBytes,createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import path from 'node:path';
function deploymentKey(){
 const secret=process.env.SESSION_SECRET;
 if(secret){if(secret.length<32)throw Error('SESSION_SECRET cần tối thiểu 32 ký tự.');return createHash('sha256').update(secret).digest()}
 const key=readFileSync(path.join(process.cwd(),'.build/session-key'),'utf8').trim();
 if(!/^[a-f0-9]{64}$/.test(key))throw Error('Khóa phiên làm bài không hợp lệ.');
 return Buffer.from(key,'hex');
}
export function sealSession(session,sourceHash){
 const payload={id:session.id,ids:session.questions.map(q=>q.id),answers:session.answers,checked:session.checked,startedAt:session.startedAt,deadline:session.deadline,minutes:session.minutes,mode:session.mode,preset:session.preset,threshold:session.threshold,finished:session.finished,sourceHash};
 const iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',deploymentKey(),iv);
 const encrypted=Buffer.concat([cipher.update(JSON.stringify(payload),'utf8'),cipher.final()]);
 return Buffer.concat([iv,cipher.getAuthTag(),encrypted]).toString('base64url');
}
export function openSession(token,bank){
 try{
  if(typeof token!=='string'||token.length>40000)throw Error();
  const bytes=Buffer.from(token,'base64url'),decipher=createDecipheriv('aes-256-gcm',deploymentKey(),bytes.subarray(0,12));
  decipher.setAuthTag(bytes.subarray(12,28));
  const payload=JSON.parse(Buffer.concat([decipher.update(bytes.subarray(28)),decipher.final()]).toString('utf8'));
  if(payload.sourceHash!==bank.sha256)throw Error('Ngân hàng câu hỏi đã đổi. Hãy tạo bài mới.');
  if(Date.now()-payload.startedAt>24*3600000)throw Error('Phiên làm bài đã hết hạn.');
  const lookup=new Map(bank.questions.map(q=>[q.id,q]));
  const questions=payload.ids.map(id=>lookup.get(id));
  if(questions.some(q=>!q))throw Error();
  const {ids,sourceHash,...session}=payload;return {...session,questions};
 }catch(error){throw Error(error.message?.startsWith('Ngân hàng')||error.message?.startsWith('Phiên làm')?error.message:'Phiên làm bài không hợp lệ hoặc đã hết hạn. Hãy tạo bài mới.')}
}
