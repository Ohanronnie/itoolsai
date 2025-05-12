import { appendFileSync, readFile, readFileSync } from "fs";

const jobQueue = [];
let jobQueueLock = false;
export function addJobToQueue(job) {
  console.log("Job added to queue:", job, jobQueue.length);
  jobQueue.push(job);
  startJobQueue();
}
function startJobQueue() {
  if (jobQueueLock) return;
  jobQueueLock = true;
  processJobQueue();
}
async function processJobQueue() {
  if (jobQueue.length === 0) {
    jobQueueLock = false;
    return;
  }
  const job = jobQueue.shift();
  try {
    await job();
  } catch (error) {
    console.error("Error processing job:", error);
  } finally {
    processJobQueue();
  }
}


class ManageContents {
  constructor(){
    this.posted = [];
    readFile('./posted.json', 'utf8', (err, data) => {
      if (err) {
        this.posted = [];
        // If the file doesn't exist, create it 
        appendFileSync('./posted.json', JSON.stringify([]));
        console.error('Error reading file:', err);
        return;
      }
      try {
        this.posted = JSON.parse(data);
      } catch (parseErr) {
        this.posted = [];
        console.error('Error parsing JSON:', parseErr);
      }
    });

  }
  set(url){
    this.posted.push(url);
    appendFileSync('./posted.json', JSON.stringify(this.posted));
  }
  has(url){
    let _posted = readFileSync('./posted.json', 'utf8');
    try {
      _posted = JSON.parse(_posted);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return false;
    }
  }
}