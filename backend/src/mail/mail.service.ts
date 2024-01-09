import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NotificationService } from '../database/notification/notification.service';
import { RegistrationEntity } from '../database/registrations/registration.entity';
import { ReportCourseRegistrationService } from '../reports/course-registration/report-course-registration.service';
import { NotificationSource } from '../shared/enums/notification-source.enum';
import { CourseRegistrationAddNotificationMessage } from './messages/course-registration-add-notification-message.class';
import { Message } from './messages/message.class';
import { CourseRegistrationMessage } from './messages/course-registration-message.class';
import { ContactMessageEntity } from '../database/contact-message/contact-message.entity';
import { ContactMessageAddMessage } from './messages/contact-message-add-message.class';

@Injectable()
export class MailService {
  private static readonly AppendText =
    '<br><br>Freundliche Grüsse<br>' +
    'Feldschützengesellschaft Winterthur<br><br>' +
    '<i>P.S. Bitte nicht auf diese Nachricht antworten, E-Mails auf diese Adresse werden nicht gelesen.</i>';

  constructor(
    private readonly mailerService: MailerService,
    private notificationService: NotificationService,
    private reportRegistration: ReportCourseRegistrationService,
  ) {}

  public async onContactMessageAdd(entity: ContactMessageEntity) {
    const message = new ContactMessageAddMessage(entity);

    const notifierList = await this.notificationService.getAllBySource(NotificationSource.ContactMessage);
    for (let notifier of notifierList) {
      await this.sendMail(notifier.name, notifier.email, message);
    }
  }

  public async onRegistrationAdd(entity: RegistrationEntity) {
    const message = new CourseRegistrationMessage();
    await this.sendMail(entity.firstname, entity.email, message);

    const report = await this.reportRegistration.generatePdf(entity);
    const reportBuffer = await report.getBuffer();
    const notifierList = await this.notificationService.getAllBySource(NotificationSource.CourseRegistration);

    for (let notifier of notifierList) {
      const notifierMessage = new CourseRegistrationAddNotificationMessage(entity, report, reportBuffer);
      await this.sendMail(notifier.name, notifier.email, notifierMessage);
    }
  }

  private async sendMail(name: string, email: string, message: Message) {
    const prependText = 'Hallo ' + name;

    await this.mailerService
      .sendMail({
        to: email,
        from: 'Feldschützengesellschaft Winterthur <fsg.winterthur@gmail.com>',
        subject: message.getSubject(),
        html: prependText + message.getText() + MailService.AppendText,
        attachments: message.getAttachments(),
      })
      .then((message) => {})
      .catch((message) => {
        console.log(message);
      });
  }
}
