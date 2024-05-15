import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { MailService } from './mail.service';
import { getMailerAsyncOptions } from '@project/shared-core';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions('email-config'))
  ],
  providers: [
    MailService
  ],
  exports: [
    MailService
  ]
})
export class MailModule {}
