import { ConfigType, registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';

import { EmailConfigurationPorts, EmailConfigurationRegistrationKey } from './email.const';
import { EmailEnvironmentConfiguration } from './email.env'

async function getEmailConfig(): Promise<EmailEnvironmentConfiguration> {
  const config = plainToClass(EmailEnvironmentConfiguration, {
    host: process.env.MAIL_SMTP_HOST,
    port: process.env.MAIL_SMTP_PORT ? parseInt(process.env.MAIL_SMTP_PORT, 10) : EmailConfigurationPorts.DEFAULT_SMTP_PORT,
    user: process.env.MAIL_SMTP_USER_NAME,
    password: process.env.MAIL_SMTP_USER_PASSWORD,
    from: process.env.MAIL_SMTP_FROM,
  });

  await config.validate();

  return config;
}

export default registerAs(EmailConfigurationRegistrationKey, async (): Promise<ConfigType<typeof getEmailConfig>> => {
  return getEmailConfig();
});
