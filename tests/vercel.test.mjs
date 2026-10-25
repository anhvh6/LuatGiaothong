import {test,before,after} from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {once} from 'node:events';
import {readFileSync} from 'node:fs';
process.env.VERCEL='1';
process.env.SESSION_SECRET='test-only-vercel-session-key-never-used-in-production';
const bank=JSON.parse(readFileSync('data/bank.json','utf8'));
const {handler:first}=await import('../server.mjs?instance=one');
const {handler:second}=await import('../server.mjs?instance=two');
const {sealSession,openSession}=await import('../lib/session-token.mjs');
const servers=[http.createServer(first),http.createServer(second)];
let origins;
before(async()=>{for(const server of servers){server.listen(0,'127.0.0.1');await once(server,'listening')}origins=servers.map(s=>'http://127.0.0.1:'+s.address().port)});
after(async()=>Promise.all(servers.map(s=>new Promise(resolve=>s.close(resolve)))));
async function post(instance,route,body,origin=origins[instance].replace('http:','https:')){
 const response=await fetch(origins[instance]+route,{method:'POST',headers:{'Content-Type':'application/json','X-App-Request':'duong-thong','Origin':origin},body:JSON.stringify(body||{})});
 return {status:response.status,data:await response.json()};
}
test('Vercel exams survive a different function instance without exposing answers',async()=>{
 const {data:e,status}=await post(0,'/api/exams',{count:3,minutes:1});assert.equal(status,200);assert.ok(e.sessionToken);assert.equal(e.questions[0].correct,undefined);
 const q=e.questions[0],answer=bank.questions.find(x=>x.id===q.id).correct;
 const {data:saved}=await post(1,`/api/exams/${e.id}/answer`,{sessionToken:e.sessionToken,id:q.id,answer});assert.equal(saved.saved,true);assert.equal(saved.correct,undefined);
 const {data:restored}=await post(0,`/api/exams/${e.id}/resume`,{sessionToken:saved.sessionToken});assert.equal(restored.answers[q.id],answer);assert.equal(restored.questions[0].correct,undefined);
 const {data:result}=await post(1,`/api/exams/${e.id}/finish`,{sessionToken:restored.sessionToken});assert.equal(result.correct,1);assert.equal(result.unanswered,2);
 const locked=await post(0,`/api/exams/${e.id}/answer`,{sessionToken:result.sessionToken,id:q.id,answer});assert.equal(locked.status,409);
});
test('Vercel practice locks checked answers and rejects altered tokens and foreign origins',async()=>{
 const {data:e}=await post(0,'/api/exams',{count:1,minutes:1,mode:'practice',ids:[204]});
 const checked=await post(1,`/api/exams/${e.id}/answer`,{sessionToken:e.sessionToken,id:204,answer:0});assert.equal(checked.data.isCorrect,true);
 const locked=await post(0,`/api/exams/${e.id}/answer`,{sessionToken:checked.data.sessionToken,id:204,answer:1});assert.equal(locked.status,409);
 const raw=Buffer.from(e.sessionToken,'base64url');raw[30]^=1;
 assert.equal((await post(0,`/api/exams/${e.id}/resume`,{sessionToken:raw.toString('base64url')})).status,400);
 assert.equal((await post(0,'/api/exams',{count:1},'https://foreign.example')).status,403);
});
test('600-question sessions fit in request bodies and keep deadlines across instances',async()=>{
 const {data:e}=await post(0,'/api/exams',{count:600,minutes:1});
 const session={...e,questions:bank.questions,answers:Object.fromEntries(bank.questions.map(q=>[q.id,q.correct])),deadline:Date.now()-1};
 const token=sealSession(session,bank.sha256);assert.ok(token.length<40000);assert.equal(Object.keys(openSession(token,bank).answers).length,600);
 assert.equal((await post(1,`/api/exams/${e.id}/answer`,{sessionToken:token,id:1,answer:0})).status,409);
 assert.equal((await post(1,`/api/exams/${e.id}/finish`,{sessionToken:token})).data.correct,600);
});
test('Vercel serves source PDF via static redirect and identifies check-only updates',async()=>{
 const res=await fetch(origins[0]+'/api/source.pdf',{redirect:'manual'});assert.equal(res.status,307);assert.equal(res.headers.get('location'),'/documents/'+bank.sha256+'.pdf');
 const data=await(await fetch(origins[1]+'/api/data')).json();assert.deepEqual(data.capabilities,{hosted:true,updateMode:'check'});
});
test('Vercel handler accepts an already-parsed JSON request body',async()=>{
 let status,payload;
 const req={url:'/api/exams',method:'POST',headers:{host:'study.example.vercel.app',origin:'https://study.example.vercel.app','x-app-request':'duong-thong'},body:{count:1,minutes:1}};
 const res={writeHead(code){status=code},end(value){payload=JSON.parse(value)}};
 await first(req,res);assert.equal(status,200);assert.equal(payload.questions.length,1);assert.ok(payload.sessionToken);
});
test('Vercel source checks never modify bundled bank files or invoke Python',async()=>{
 const {updateBank}=await import('../lib/updater.mjs');const before=readFileSync('data/bank.json','utf8');
 const originalFetch=globalThis.fetch;const pdf=readFileSync('data/official-600.pdf');
 try{
  globalThis.fetch=async()=>new Response(pdf);const same=await updateBank();assert.equal(same.available,false);assert.equal(same.changed,false);
  globalThis.fetch=async()=>new Response(Buffer.concat([pdf,Buffer.from('\n')]));const changed=await updateBank();assert.equal(changed.available,true);assert.equal(changed.changed,false);
  assert.equal(readFileSync('data/bank.json','utf8'),before);
 }finally{globalThis.fetch=originalFetch}
});
