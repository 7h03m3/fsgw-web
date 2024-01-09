import { Message } from './message.class';
import { RegistrationEntity } from '../../database/registrations/registration.entity';
import { PdfFile } from '../../reports/base/classes/pdf-file.class';

export class CourseRegistrationAddNotificationMessage extends Message {
  public constructor(entity: RegistrationEntity, report: PdfFile, buffer: Buffer | undefined) {
    const name = entity.firstname + ' ' + entity.lastname;
    super(
      'Neue Anmeldung von ' + name + ' erhalten',
      '<br><br>Es wurde eine neue Anmeldung von ' + name + ' erhalten.',
      report,
      buffer,
    );
  }
}
