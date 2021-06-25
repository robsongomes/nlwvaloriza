import sendGridMail from '@sendgrid/mail'

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

interface IMailRequest {
    to: string;    
    subject: string;
    from: string;
    content: string;
}

class MailSenderService {

    async send(mail: IMailRequest): Promise<void> {
        await sendGridMail.send(mail as sendGridMail.MailDataRequired);        
    }
}

export { MailSenderService }