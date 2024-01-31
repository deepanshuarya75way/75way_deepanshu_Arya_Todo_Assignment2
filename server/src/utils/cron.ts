import { CronJob } from 'cron';
import { sendMail } from './sendMail';
let job: CronJob;


let jobs: { [key: string]: CronJob } = {};

export function startCronJob(userId: string, seconds: number, emails: string[], task: any) {
  const futureDate = new Date();
  futureDate.setSeconds(futureDate.getSeconds() + seconds);

  const jobKey = `${userId}_${task.title}`;

  const job = new CronJob(futureDate, function() {
    sendMail(emails, {
      subject: 'Task Not Completed',
      text: `<b>Task</b> ${task.title} <br> <b>Description:</b> ${task.body} <br>  was not finished in deadline</b>`
    });
    this.stop();
  });

  jobs[jobKey] = job;
  job.start();
}

export function stopCronJob(userId: any, taskName: string) {
  const jobKey = `${userId}_${taskName}`;

  if (jobs[jobKey]) {
    jobs[jobKey].stop();
    delete jobs[jobKey];
  }
}