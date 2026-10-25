import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import {generateExam,grade} from '../lib/exam.mjs';
const bank=JSON.parse(readFileSync(new URL('../data/bank.json',import.meta.url),'utf8')).questions;
test('600 sequential questions, 60 critical, valid answers and existing illustrations',()=>{
 assert.equal(bank.length,600);assert.equal(bank.filter(q=>q.critical).length,60);
 for(let i=0;i<600;i++){const q=bank[i];assert.equal(q.id,i+1);assert.ok(q.text.length>8);assert.ok(q.options.length>=2&&q.options.length<=4);assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length);assert.ok(q.options.every(o=>! /\s[1-4]\.\s/.test(o)),`Merged PDF columns: ${q.id}`);for(const image of q.images)assert.ok(existsSync(path.resolve('public','.'+image)),image)}
 assert.equal(bank[300].options.length,4);assert.equal(bank[301].options.length,4);assert.equal(bank[351].options.length,3);assert.equal(bank[203].correct,0);
 assert.deepEqual([1,2,3,4,5,6].map(c=>bank.filter(q=>q.chapter===c).length),[180,25,58,37,185,115]);
});
test('hạng B preserves exact chapter allocation, one critical, no duplicates',()=>{
 for(let i=0;i<20;i++){const e=generateExam(bank,{preset:'B'});assert.equal(e.questions.length,30);assert.equal(e.questions.filter(q=>q.critical).length,1);assert.equal(new Set(e.questions.map(q=>q.id)).size,30);assert.deepEqual([1,2,3,4,5,6].map(c=>e.questions.filter(q=>q.chapter===c&&!q.critical).length),[8,1,1,1,9,9]);assert.equal(e.threshold,27);assert.equal(e.minutes,20)}
});
test('all correct passes, one critical wrong or unanswered fails',()=>{
 const e=generateExam(bank,{preset:'B'});const answers=Object.fromEntries(e.questions.map(q=>[q.id,q.correct]));assert.ok(grade(e.questions,answers,27).passed);const critical=e.questions.find(q=>q.critical);answers[critical.id]=(critical.correct+1)%critical.options.length;assert.equal(grade(e.questions,answers,27).passed,false);delete answers[critical.id];assert.deepEqual(grade(e.questions,answers,27).criticalFailed,[critical.id]);assert.equal(grade(e.questions,answers,27).unanswered,1);
});
test('custom pools, critical-only, chapter and invalid counts',()=>{
 assert.equal(generateExam(bank,{count:600}).questions.length,600);assert.ok(generateExam(bank,{count:60,criticalOnly:true}).questions.every(q=>q.critical));assert.ok(generateExam(bank,{count:12,chapter:5}).questions.every(q=>q.chapter===5));assert.throws(()=>generateExam(bank,{count:601}));assert.throws(()=>generateExam(bank,{count:26,chapter:2}));assert.throws(()=>generateExam(bank,{minutes:0}));assert.throws(()=>generateExam(bank,{mode:'invalid'}));
});
