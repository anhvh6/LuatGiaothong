"""Extract the public CSGT 2025 question book. Never guess an answer."""
import sys, json, re, pathlib, datetime, hashlib
import pdfplumber

ROOT = pathlib.Path(__file__).resolve().parents[1]
source = pathlib.Path(sys.argv[1]) if len(sys.argv)>1 else ROOT/'data/official-600.pdf'
out = pathlib.Path(sys.argv[2]) if len(sys.argv)>2 else ROOT/'data/bank.json'
image_dir = pathlib.Path(sys.argv[3]) if len(sys.argv)>3 else ROOT/'public/images'
image_dir.mkdir(parents=True, exist_ok=True)
critical = {19,20,21,22,23,24,25,26,27,28,30,32,34,35,47,48,52,53,55,58,63,64,65,66,67,68,70,71,72,73,74,85,86,87,88,89,90,91,92,93,97,98,102,117,163,165,167,197,198,206,215,226,234,245,246,252,253,254,255,260}
questions=[]
current=None
opt=-1
with pdfplumber.open(source) as doc:
    for pi,p in enumerate(doc.pages[3:],3):
        lines=p.extract_text_lines(return_chars=False)
        under=[r for r in p.rects if r['height']<1.6 and r['width']>3 and isinstance(r.get('non_stroking_color'),(int,float)) and r['non_stroking_color']<0.4]
        expanded=[]
        for line in lines:
            if re.match(r'^[1-4]\.\s',line['text']) and re.search(r'\s[1-4]\.\s',line['text']):
                words=[w for w in p.extract_words() if abs(w['top']-line['top'])<3]
                bounds=[w['x0'] for i,w in enumerate(words) if re.match(r'^[1-4]\.$',w['text']) and (i==0 or w['x0']-words[i-1]['x1']>20)]+[line['x1']+1]
                for left,right in zip(bounds,bounds[1:]):
                    text=' '.join(w['text'] for w in words if left<=w['x0']<right)
                    expanded.append({**line,'text':text,'x0':left,'x1':right-1})
            else:expanded.append(line)
        lines=expanded
        starts=[(l['top'],int(m.group(1))) for l in lines if (m:=re.match(r'^Câu\s+(\d+)[.:]',l['text']))]
        for line in lines:
            text=line['text'].strip()
            if line['top']<55 or text.startswith('CHƯƠNG') or (not current and not text.startswith('Câu ')):
                continue
            m=re.match(r'^Câu\s+(\d+)[.:]\s*(.*)',text)
            if m:
                n=int(m.group(1))
                current={'id':n,'text':m.group(2),'options':[],'correct':None,'critical':n in critical,'chapter':1 if n<=180 else 2 if n<=205 else 3 if n<=263 else 4 if n<=300 else 5 if n<=485 else 6,'page':pi+1,'images':[],'_correct':set()}
                questions.append(current);opt=-1
            elif re.match(r'^[1-4]\.\s',text):
                opt=int(text[0])-1
                while len(current['options'])<=opt:current['options'].append('')
                if current['options'][opt]:raise ValueError(f"Duplicate option at {current['id']}: {text}")
                current['options'][opt]=text[3:].strip()
            elif opt>=0:
                current['options'][opt]+=' '+text
            elif current:
                current['text']+=' '+text
            if current and opt>=0 and any(abs(r['top']-line['bottom'])<5 and r['x0']<line['x1'] and r['x1']>line['x0'] for r in under):
                current['_correct'].add(opt)
        for idx,(top,n) in enumerate(starts):
            end=starts[idx+1][0] if idx+1<len(starts) else p.height-35
            imgs=[im for im in p.images if im['top']>=top and im['bottom']<=end+1]
            if imgs:
                q=next(q for q in questions if q['id']==n)
                # Include labels printed below sign images, but stop before the options.
                option_lines=[l for l in lines if top<l['top']<end and re.match(r'^1\.\s',l['text'])]
                bottom=min(option_lines[0]['top']-3,end-2) if option_lines else max(im['bottom'] for im in imgs)+3
                bbox=(max(0,min(im['x0'] for im in imgs)-3),min(im['top'] for im in imgs)-2,min(p.width,max(im['x1'] for im in imgs)+3),max(bottom,max(im['bottom'] for im in imgs)))
                name=f'q{n}.png'
                p.crop(bbox).to_image(resolution=130).save(str(image_dir/name))
                q['images'].append('/images/'+name)
        p.flush_cache()

errors=[]
for q in questions:
    answers=q.pop('_correct')
    if len(answers)!=1 or not 2<=len(q['options'])<=4 or not all(q['options']):
        errors.append({'id':q['id'],'answers':list(answers),'options':len(q['options'])})
    else:q['correct']=next(iter(answers))
if len(questions)!=600 or errors:
    print(json.dumps({'count':len(questions),'errors':errors},ensure_ascii=False));sys.exit(1)
bank={'version':'CSGT-2025','title':'600 câu hỏi sát hạch lái xe cơ giới đường bộ – Cục CSGT (2025)','updatedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'sourceUrl':'https://f.hoatieu.vn/data/pdf/2025/05/14/cau-hoi-thi-giay-phep-lai-xe.pdf','questions':questions}
out.write_text(json.dumps(bank,ensure_ascii=False),encoding='utf-8')
print(json.dumps({'questions':len(questions),'critical':sum(q['critical'] for q in questions),'illustrated':sum(bool(q['images']) for q in questions)},ensure_ascii=False))

