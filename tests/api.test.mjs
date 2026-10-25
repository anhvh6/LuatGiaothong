import {test,before,after} from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {readFileSync} from 'node:fs';
const base='http://127.0.0.1:3137';
let child;
before(async()=>{
 child=spawn(process.execPath,['server.mjs'],{env:{...process.env,PORT:'3137'},windowsHide:true,stdio:['ignore','pipe','pipe']});
 await new Promise((resolve,reject)=>{child.stdout.once('data',resolve);child.once('error',reject);child.once('exit',code=>reject(Error('Server exited '+code)))});
});
after(()=>child?.kill());
const post=(url,body)=>fetch(base+url,{method:'POST',headers:{'Content-Type':'application/json','X-App-Request':'duong-thong'},body:JSON.stringify(body||{})});
test('HTTP API hides exam answers, persists choices and grades only on finish',async()=>{
 const data=await(await fetch(base+'/api/data')).json();assert.equal(data.total,600);assert.ok(data.questions.every(q=>q.correct===undefined));
 const e=await(await post('/api/exams',{count:2,minutes:1,mode:'exam'})).json();assert.equal(e.questions.length,2);assert.ok(e.questions.every(q=>q.correct===undefined));
 const bank=JSON.parse(readFileSync('data/bank.json','utf8')).questions;
 const q=e.questions[0],answer=bank.find(x=>x.id===q.id).correct;
 const saved=await(await post(`/api/exams/${e.id}/answer`,{id:q.id,answer})).json();assert.deepEqual(saved,{saved:true});
 const restored=await(await fetch(base+`/api/exams/${e.id}`)).json();assert.equal(restored.answers[q.id],answer);assert.ok(restored.questions.every(q=>q.correct===undefined));
 const r=await(await post(`/api/exams/${e.id}/finish`)).json();assert.equal(r.correct,1);assert.equal(r.unanswered,1);assert.ok(r.questions.every(q=>Number.isInteger(q.correct)));assert.equal((await post(`/api/exams/${e.id}/answer`,{id:q.id,answer})).status,409);
});
test('practice reveals one checked answer and prevents changing it',async()=>{
 const e=await(await post('/api/exams',{count:1,minutes:1,mode:'practice',ids:[204]})).json();
 const draft=await(await post(`/api/exams/${e.id}/answer`,{id:204,answer:1,check:false})).json();assert.deepEqual(draft,{saved:true});
 const saved=await(await fetch(base+`/api/exams/${e.id}`)).json();assert.equal(saved.answers[204],1);assert.equal(saved.questions[0].correct,undefined);
 const r=await(await post(`/api/exams/${e.id}/answer`,{id:204,answer:0})).json();assert.equal(r.correct,0);assert.equal(r.isCorrect,true);assert.equal((await post(`/api/exams/${e.id}/answer`,{id:204,answer:1})).status,409);
 assert.equal((await(await post(`/api/exams/${e.id}/finish`)).json()).correct,1);
});
test('invalid answers, empty question pools, unknown sessions and cross-origin updates fail',async()=>{
 assert.equal((await post('/api/exams',{count:26,chapter:2})).status,400);
 assert.equal((await fetch(base+'/api/exams/00000000')).status,404);
 assert.equal((await fetch(base+'/api/update',{method:'POST',headers:{Origin:'https://untrusted.example','X-App-Request':'duong-thong'}})).status,403);
 assert.equal((await fetch(base+'/api/update',{method:'POST'})).status,403);
 const e=await(await post('/api/exams',{count:1})).json();assert.equal((await post(`/api/exams/${e.id}/answer`,{id:e.questions[0].id,answer:20})).status,400);
});
