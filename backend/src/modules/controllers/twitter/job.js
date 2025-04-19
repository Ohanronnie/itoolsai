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
