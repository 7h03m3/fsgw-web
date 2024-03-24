import { Component, HostListener, ViewChild } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { WindowService } from './shared/services/window.service';
import { ContactMessageService } from './shared/services/contact-message.service';

export interface SubmenuEntry {
  name: string;
  routerLink: string;
}

export interface MenuEntry extends SubmenuEntry {
  subs: SubmenuEntry[];
  expanded: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'FSGW';
  @ViewChild('drawer') drawer: any;
  private currentYearString = new Date().getFullYear().toString();
  public menuEntries: Array<MenuEntry> = [
    {
      name: 'Home',
      routerLink: '/',
      expanded: false,
      subs: [],
    },
    {
      name: 'Verein',
      routerLink: '',
      expanded: false,
      subs: [
        { name: 'Über uns', routerLink: '/public/club/about-us' },
        { name: 'Schiessstand', routerLink: '/public/club/shooting-range' },
        { name: 'Vorstand', routerLink: '/public/club/board' },
        {
          name: 'Reglemente und Statuten',
          routerLink: '/public/club/statutes',
        },
        { name: 'Kontakt', routerLink: '/public/club/contact' },
      ],
    },
    {
      name: 'Resultate',
      routerLink: '',
      expanded: false,
      subs: [
        {
          name: this.currentYearString,
          routerLink: '/public/results;year=' + this.currentYearString,
        },
        { name: 'Alle', routerLink: '/public/results' },
      ],
    },
    {
      name: 'Jungschützenkurs',
      routerLink: '',
      expanded: false,
      subs: [
        { name: 'Informationen', routerLink: '/public/js/information' },
        { name: 'Termine', routerLink: '/public/event-list;category=JS' },
        { name: 'Anmeldung', routerLink: '/public/js/registration' },
      ],
    },
    {
      name: 'Veranstaltungen',
      routerLink: '',
      expanded: false,
      subs: [
        { name: 'Alle', routerLink: '/public/event-list' },
        {
          name: 'Bundesübung / Obli',
          routerLink: '/public/event-list;category=BU',
        },
        { name: 'Feldschiessen', routerLink: '/public/event-list;category=FS' },
        {
          name: 'Jungschützenkurs',
          routerLink: '/public/event-list;category=JS',
        },
        {
          name: 'Jahresmeisterschaft',
          routerLink: '/public/event-list;category=JM',
        },
        { name: 'Freie Übungen', routerLink: '/public/event-list;category=FU' },
      ],
    },
    {
      name: 'Downloads',
      routerLink: '/public/downloads',
      expanded: false,
      subs: [],
    },
    {
      name: 'Diverses',
      routerLink: '',
      expanded: false,
      subs: [
        {
          name: 'Abgabe der persönlichen Militärwaffe',
          routerLink: '/public/misc/personal-weapon',
        },
        {
          name: 'Neues Waffengesetz',
          routerLink: '/public/misc/new-weapon-law',
        },
      ],
    },
  ];

  constructor(
    public authService: AuthService,
    private router: Router,
    public windowService: WindowService,
    public contactMessageService: ContactMessageService
  ) {}

  public ngOnInit() {}

  @HostListener('window:resize', ['$event'])
  public onWindowResize() {
    this.windowService.setSize(window.innerWidth, window.innerHeight);
  }

  public isFirstToolbarRowVisible() {
    return !this.windowService.isSmallScreen();
  }

  public onSidenav(entry: SubmenuEntry) {
    if (entry.routerLink == '') {
      return;
    }
    this.router.navigateByUrl(entry.routerLink).then(() => {
      this.drawer.close();
      this.menuEntries.forEach((entry) => {
        entry.expanded = false;
      });
    });
  }
}
