import {updateBank} from '../lib/updater.mjs';
try{console.log(await updateBank())}catch(error){console.error(error.message);process.exitCode=1}
