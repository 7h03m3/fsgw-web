import { Message } from './message.class';

export class CourseRegistrationMessage extends Message {
  public constructor() {
    super(
      'Kursanmeldung',
      '<br><br>Wir haben deine Kursanmeldung erhalten, besten Dank. Wir werden die Anmeldung prüfen. ' +
        'Es wird sich ein Leiter direkt bei dir melden.',
      undefined,
      undefined,
    );
  }
}
