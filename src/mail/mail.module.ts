import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: 'smtp.gmail.com',
          secure: false,
          auth: {
            user: 'islumsaiful@gmail.com',
            pass: 'nwfzmunpbebplolf',
          },
        },
        defaults: {
          from: `"No Reply" islumsaiful@gmail.com`,
        },
      }),
      inject: [],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
