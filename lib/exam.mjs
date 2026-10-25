export function shuffle(items) {
  const copy=[...items];
  for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}
  return copy;
}
export function generateExam(bank,{count=30,minutes=20,mode='exam',preset='custom',chapter=0,criticalOnly=false,ids=null}={}) {
  if(!Number.isInteger(count)||count<1||count>600)throw Error('Số câu phải là số nguyên từ 1 đến 600.');
  if(!Number.isInteger(minutes)||minutes<1||minutes>300)throw Error('Thời gian phải từ 1 đến 300 phút.');
  if(!['exam','practice'].includes(mode))throw Error('Chế độ làm bài không hợp lệ.');
  let pool=bank.filter(q=>(!chapter||q.chapter===Number(chapter))&&(!criticalOnly||q.critical)&&(!ids||ids.includes(q.id)));
  let questions;
  if(preset==='B'){
    const pick=(arr,n)=>{if(arr.length<n)throw Error('Không đủ câu hỏi để tạo đề hạng B.');return shuffle(arr).slice(0,n)};
    questions=[...pick(bank.filter(q=>q.critical),1),...[[1,8],[2,1],[3,1],[4,1],[5,9],[6,9]].flatMap(([c,n])=>pick(bank.filter(q=>q.chapter===c&&!q.critical),n))];
    count=30;minutes=20;
  }else{
    if(pool.length<count)throw Error(`Chỉ có ${pool.length} câu phù hợp. Hãy giảm số câu.`);
    const crit=pool.filter(q=>q.critical);
    questions=crit.length&&!criticalOnly&&!chapter&&!ids?[shuffle(crit)[0],...shuffle(pool.filter(q=>!q.critical)).slice(0,count-1)]:shuffle(pool).slice(0,count);
    if(questions.length<count)questions=shuffle(pool).slice(0,count);
  }
  return {questions:shuffle(questions),minutes,mode,preset,threshold:preset==='B'?27:Math.ceil(count*.9)};
}
export function grade(questions,answers,threshold){
  const correct=questions.filter(q=>answers[q.id]===q.correct).length;
  const unanswered=questions.filter(q=>!Number.isInteger(answers[q.id])).length;
  const criticalFailed=questions.filter(q=>q.critical&&answers[q.id]!==q.correct).map(q=>q.id);
  return {correct,total:questions.length,unanswered,wrong:questions.length-correct-unanswered,criticalFailed,passed:correct>=threshold&&!criticalFailed.length,threshold};
}
