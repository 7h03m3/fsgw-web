import { Injectable } from '@nestjs/common';
import { PdfBase } from '../base/pdf-base.class';
import { RegistrationEntity } from '../../database/registrations/registration.entity';
import { PdfTableRowItem } from '../base/classes/pdf-table-row-item';
import { RegistrationType } from '../../shared/enums/registration-type.enum';
import { DateHelper } from '../../shared/classes/date-helper.classes';
import { PdfFile } from '../base/classes/pdf-file.class';

const fs = require('fs');
const PDFDocument = require('pdfkit-table');
type Row = Record<string, PdfTableRowItem>;

@Injectable()
export class ReportCourseRegistrationService extends PdfBase {
  private titleFontSize = 16;
  private subTitleFontSize = 14;
  private fontSize = 12;
  private marginTop = this.mm2Pt(35);
  private marginBottom = this.mm2Pt(25);
  private marginLeft = this.mm2Pt(25);
  private marginRight = this.mm2Pt(25);

  public async generatePdf(registration: RegistrationEntity): Promise<PdfFile> {
    const tempFilename: string = './' + this.getRandomFilename() + '.pdf';
    const filename =
      'Anmeldung_' + registration.year + '_' + registration.firstname + '_' + registration.lastname + '.pdf';

    const doc = new PDFDocument({
      margins: {
        top: this.marginTop,
        bottom: this.marginBottom,
        left: this.marginLeft,
        right: this.marginRight,
      },
      size: 'A4',
      bufferPages: true,
      autoGenerate: false,
    });
    //const fileStream = fs.createWriteStream(tempFilename);
    //await doc.pipe(fileStream);
    const stream = doc.pipe(fs.createWriteStream(tempFilename));

    this.addTitle('Kursanmeldung ' + registration.year, doc);
    this.addNewLine(doc);
    this.add2Text('Vorname', registration.firstname, this.fontSize, false, 60, doc);
    this.add2Text('Nachname', registration.lastname, this.fontSize, false, 60, doc);
    this.add2Text('Strasse', registration.street, this.fontSize, false, 60, doc);
    this.add2Text('Ort', registration.zip + ' ' + registration.location, this.fontSize, false, 60, doc);

    const birthDayString = DateHelper.getDateString(registration.birthDate);
    this.add2Text('Geburtstag', birthDayString, this.fontSize, false, 60, doc);
    this.add2Text('Nationalität', registration.nationality, this.fontSize, false, 60, doc);
    this.add2Text('E-Mail', registration.email, this.fontSize, false, 60, doc);
    this.add2Text('Natelnummer', registration.mobile, this.fontSize, false, 60, doc);
    this.add2Text('AHV-Nummer', registration.insuranceNumber, this.fontSize, false, 60, doc);

    let courseText = '';
    switch (registration.type) {
      case RegistrationType.JJK:
        courseText = 'Juniorenkurs (Alter 10 - 14)';
        break;
      case RegistrationType.JSK:
        courseText = 'Jungschützenkurs (Alter 15 - 20)';
        break;
    }

    this.add2Text('Kurs', courseText, this.fontSize, false, 60, doc);

    this.addNewLine(doc);
    this.addNewLine(doc);
    this.addNewLine(doc);
    this.addNewLine(doc);

    this.addText(
      'Hiermit erklären Sie sich mit den Kursbedingungen (siehe Anhang) einverstanden und nehme am Jungschützen-/Juniorenkurs ' +
        registration.year +
        ' der FSGW teil.',
      this.fontSize,
      false,
      170,
      doc,
    );

    this.addSignField('Unterschrift', doc);
    this.addSignField('Unterschrift des Erziehungsberechtigten (falls minderjährig)', doc);

    doc.addPage();

    this.addAppendix(doc);
    this.addPageHeader(doc);

    return this.returnFile(doc, filename, tempFilename, stream);
  }

  private addAppendixEntry(title: string, text: string, pdf: any) {
    this.addNewLine(pdf);
    this.addTextItalic(title, this.subTitleFontSize, true, 170, pdf);
    this.addText(text, this.fontSize, false, 170, pdf);
  }

  private addTitle(title: string, pdf: any) {
    this.addText(title, this.titleFontSize, true, 170, pdf);
  }

  private addBulletList(list: string[], pdf: any) {
    pdf.list(list, { indent: this.mm2Pt(10) });
    this.addNewLine(pdf);
  }

  private addAppendix(doc: any) {
    this.addTitle('Anhang – Kursbedingungen', doc);

    this.addAppendixEntry(
      'Zielgruppen',
      'Das Kursangebot richtet sich an Jugendliche im Alter von 10 - 20, die das sportliche Schiessen mit dem ' +
        'Sturmgewehr 90 (Stgw90) auf 300m (liegend) erlernen wollen. Der Teilnehmer muss Schweizerstaatsbürger sein. ' +
        'Ist dies nicht der Fall, muss eine Spezialbewilligung beim Bund durch die Feldschützengesellschaft Winterthur ' +
        '(FSGW) eingeholt werden.',
      doc,
    );

    this.addAppendixEntry(
      'Anmeldung',
      'Die Kursanmeldung erfolgt via Internet http://www.fsgw.ch/. Die Anmeldung ' +
        'ist zusätzlich am Theorieabend unterschrieben mitzunehmen. Mit der Anmeldung sind Sie definitiv für den Kurs vorgemerkt.',
      doc,
    );
    this.addAppendixEntry(
      'Vorbehalte',
      'Wir behalten uns vor, Kurse mangels Teilnehmer abzusagen oder Sie bei ' +
        'Überbuchungen an andere Kurse zu verweisen. In diesem Fall werden Sie von uns rechtzeitig informiert. ' +
        'Änderungen gegenüber der Kursausschreibung sind möglich.',
      doc,
    );
    this.addAppendixEntry(
      'Abmeldung / Rücktritt',
      'Sollten Sie einen Kurs nicht besuchen können, bitten wir Sie, ' +
        'die Abmeldung schriftlich oder per E-Mail an die FSGW zu richten. Ein Kursabmeldungen muss min. 10 Tage vor ' +
        'Kursbeginn (Theorieabend) eingereicht werden.',
      doc,
    );
    this.addAppendixEntry(
      'Anwesenheit',
      'Der Teilnehmer verpflichtet sich an min. 80% der Kursübungen teilzunehmen. ' +
        'Folgende Anlässe sind davon ausgeschlossen und müssen zwingend besucht werden:',
      doc,
    );
    this.addBulletList(['Theorieabend', 'Wettschiessen', 'Abschliessende Gewehrreinigung & Absenden'], doc);

    this.addText(
      'Sollte ein Teilnehmer nicht an einer Übung teilnehmen können, so muss er sich min. 24h vorher beim Hauptleiter abmelden.',
      this.fontSize,
      false,
      170,
      doc,
    );

    this.addAppendixEntry(
      'Versicherung',
      'Während des ganzen Kurses ist der Teilnehmer über die ' +
        'Feldschützengesellschaft Winterthur oder über das Militär versichert.',
      doc,
    );
    this.addAppendixEntry(
      'Fotografien / Videos',
      'Während des Kurses können für Berichte Fotos und Video-Aufnahmen durch die Leiter oder die Teilnehmer gemacht ' +
        'werden. Der Teilnehmer erklärt sich damit einverstanden, dass die Fotos auf der Vereinswebseite (http://www.fsgw.ch) ' +
        'veröffentlicht werden können. ' +
        'Wird dies nicht gewünscht, so kontaktieren Sie bitte den Hauptleiter.',
      doc,
    );

    doc.addPage();

    this.addAppendixEntry(
      'Finanzielles',
      'Die Teilnahme am Kurs ist gratis. Unter folgenden Bedingungen können Aufwandsentschädigungen erhoben werden:',
      doc,
    );

    this.addBulletList(
      [
        'Kursabbruch (100.00 SFr.)',
        'Nicht erreichen der 80% Anwesenheit (80.00 SFr.)',
        'Nichtteilnahme an einem zwingenden Anlass (40.00 SFr.)',
        'Nicht kommuniziertes Fernbleiben einer Übung (20.00 SFr.)',
        'Zu spätes Eintreffen an einer Übung (> 5min) (5.00 SFr.)',
      ],
      doc,
    );

    this.addText(
      'Die Entschädigung ist nötig, da die Nichtteilnahme eine Streichung der Kurs-Bundesbeiträge zur Folge hat. ' +
        'Der Teilnehmer nimmt die Liste zur Kenntnis und erklärt sich damit einverstanden ev. anfallende Entschädigungen am ' +
        'Ende des Kurses zu begleichen. Ob eine Aufwandsentschädigung ausgesprochen wird, liegt im Ermessen des Hauptleiters.',
      this.fontSize,
      false,
      170,
      doc,
    );
  }

  private addPageHeader(doc: any) {
    let pages = doc.bufferedPageRange();
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i);
      doc.image(__dirname + '/../images/Logo_FSGW_A4.jpg', this.mm2Pt(25), this.mm2Pt(10), {
        width: this.mm2Pt(160),
        height: this.mm2Pt(15),
      });
    }
  }

  private drawLine(x: number, y: number, length: number, doc: any) {
    doc
      .moveTo(this.marginLeft + this.mm2Pt(x), doc.y + this.mm2Pt(y))
      .lineTo(this.marginLeft + this.mm2Pt(x) + this.mm2Pt(length), doc.y + this.mm2Pt(y))
      .stroke();
  }

  private addSignField(signText: string, doc: any) {
    this.addNewLine(doc);
    this.addNewLine(doc);
    this.addNewLine(doc);
    this.addNewLine(doc);
    this.addNewLine(doc);
    this.addNewLine(doc);

    this.drawLine(0, -0.5, 50, doc);
    this.drawLine(60, -0.5, 100, doc);
    this.add2Text('  Datum', '  ' + signText, 10, false, 60, doc);
  }
}
