import { MailPriority } from './mailPriority';

export interface MailRequest {
    toEmail: string;
    subject: string;
    body: string;
    priority: MailPriority;
}

export interface MailSetting {
    from: string;
    displayName: string;
    host: string;
    port: number;
    password: string;
}