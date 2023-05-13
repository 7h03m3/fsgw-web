import { Component, Input } from '@angular/core';
import { MenuEntry, SubmenuEntry } from '../../../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-menu-button',
  templateUrl: './toolbar-menu-button.component.html',
  styleUrls: ['./toolbar-menu-button.component.css'],
})
export class ToolbarMenuButtonComponent {
  @Input() menuEntry!: MenuEntry;

  public constructor(private router: Router) {}

  public onMenuClick(subEntry: SubmenuEntry) {
    this.router.navigateByUrl(subEntry.routerLink);
  }

  public hasChildren(): boolean {
    return this.menuEntry.subs.length != 0;
  }
}
