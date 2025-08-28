import express from 'express'
import cors from 'cors';
import os from 'node:os';
import bodyParser from 'body-parser'

const PORT = 3000

const app = express();
app.use(cors());
app.use(bodyParser.json())

app.get('/spec/os',(req,res) => {
    const spec = {
         Parallelism : os.availableParallelism(),
         Arch : os.arch(),
         Total_Memory : os.totalmem(),
         Free_Memory : os.freemem(),
         Host_Name : os.hostname(),
         Machine_Type : os.machine(),
         Platform : os.platform(),
         Operating_System_Name : os.type(),
         Operating_System_Version : os.version(),
         CPUes : os.cpus(),

    }
    res.json(spec)  


});

app.listen(PORT,()=>{
    console.log('LISTENS');
    
})