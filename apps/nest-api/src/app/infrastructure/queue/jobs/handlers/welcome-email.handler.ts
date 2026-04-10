import { Injectable, Logger } from '@nestjs/common';
import { WelcomeEmailPayload } from '../job.interface';

@Injectable()
export class WelcomeEmailHandler {
  private readonly logger = new Logger(WelcomeEmailHandler.name);

  async handle(data: WelcomeEmailPayload) {
    setTimeout(() => {
      this.logger.log(`Envoi welcome email à ${data.name} <${data.email}>`);
    }, 20000)

    // ici : Nodemailer, SendGrid, Resend...
  }
}
