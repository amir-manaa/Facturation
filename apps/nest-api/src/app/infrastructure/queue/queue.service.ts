import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import {
  JobNameType, JobPayloadMap,
} from '@api/app/infrastructure/queue/jobs/job.interface';


@Injectable()
export class QueueService {
  constructor(@InjectQueue('app-queue') private queue: Queue) {}

  async addJob<N extends JobNameType>(
    name: N,
    data: JobPayloadMap[N]
  ): Promise<void> {
    await this.queue.add(name, data, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 3000 },
      removeOnComplete: 100,
      removeOnFail: 50,
    });
  }
}
