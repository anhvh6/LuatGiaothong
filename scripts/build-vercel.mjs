import {mkdir,writeFile,readFile,copyFile} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const bank=JSON.parse(await readFile(path.join(root,'data/bank.json'),'utf8'));
await mkdir(path.join(root,'.build'),{recursive:true});
// A shared deployment key, never published as a static file or committed.
await writeFile(path.join(root,'.build/session-key'),randomBytes(32).toString('hex'),{mode:0o600});
await mkdir(path.join(root,'public/documents'),{recursive:true});
await copyFile(path.join(root,'data',bank.pdfFile||'official-600.pdf'),path.join(root,'public/documents',bank.sha256+'.pdf'));
console.log('Vercel: Node.js API, public assets and source PDF prepared.');
