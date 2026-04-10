import { Processor, WorkerHost } from '@nestjs/bullmq';
import { WelcomeEmailHandler } from '@api/app/infrastructure/queue/jobs/handlers/welcome-email.handler';
import { Job } from 'bullmq';
import { JobName } from '@api/app/infrastructure/queue/jobs/job.interface';


@Processor('app-queue')
export class QueueProcessor extends WorkerHost {
  constructor(private welcomeEmailHandler: WelcomeEmailHandler) {
    super();
  }

  async process(job: Job) {
    switch (job.name) {
      case JobName.WELCOME_EMAIL:
        return this.welcomeEmailHandler.handle(job.data);

      default:
        throw new Error(`No handler for job ${job.name}`);
    }
  }
}
