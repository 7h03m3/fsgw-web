import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RegistrationDto } from '../../../shared/dtos/registration.dto';
import { MatDialog } from '@angular/material/dialog';
import { UserSettingsService } from '../../../shared/services/user-settings.service';
import { RegistrationApiService } from '../../../api/registration-api.service';
import { ContentManagerJskRegistrationEditDialogComponent } from '../jsk-registration-edit-dialog/content-manager-jsk-registration-edit-dialog.component';
import { catchError, EMPTY, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ContentManagerJskRegistrationInfoComponent } from './components/jsk-registration-info/content-manager-jsk-registration-info.component';
import { DownloadHelper } from '../../../shared/classes/download-helper';

@Component({
  selector: 'app-content-manager-jsk-registration-list',
  templateUrl: './content-manager-jsk-registration-list.component.html',
  styleUrl: './content-manager-jsk-registration-list.component.css',
})
export class ContentManagerJskRegistrationListComponent
  implements AfterViewInit, OnInit
{
  public dataSource = new MatTableDataSource<RegistrationDto>();
  public displayedColumns: string[] = [
    'course',
    'date',
    'firstname',
    'lastname',
    'email',
    'mobile',
    'action',
  ];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(
    public dialog: MatDialog,
    private registrationApi: RegistrationApiService,
    private userSettings: UserSettingsService,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet
  ) {}

  public ngOnInit(): void {
    this.fetch();
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onCreate() {
    const newElement = new RegistrationDto();
    this.openDialog(newElement);
  }

  public onEdit(element: RegistrationDto) {
    this.openDialog(element);
  }

  public onDelete(element: RegistrationDto) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        itemName: 'Anmeldung von ' + element.firstname + ' ' + element.lastname,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.registrationApi
          .delete(element.id)
          .subscribe((data) => this.fetch());
      }
    });
  }

  public onInfo(element: RegistrationDto) {
    this.bottomSheet.open(ContentManagerJskRegistrationInfoComponent, {
      data: element,
    });
  }

  public onDownload(element: RegistrationDto) {
    this.registrationApi
      .getRegistrationReport(element.id)
      .subscribe((response) => {
        DownloadHelper.downloadPdfFile(response, 'application/pdf');
      });
  }

  public onYearChange() {
    this.fetch();
  }

  private handleRequest(observable: Observable<any>) {
    observable
      .pipe(
        catchError((response) => {
          this.snackBar.open(
            'Fehler: "' + response.error.message + '"',
            'Okay',
            { duration: 10000 }
          );
          this.fetch();
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.fetch();
      });
  }

  private fetch() {
    this.registrationApi
      .getAllByYear(this.userSettings.getCurrentYear())
      .subscribe((response) => {
        this.dataSource.data = response;
      });
  }

  private openDialog(element: RegistrationDto) {
    const dialogRef = this.dialog.open(
      ContentManagerJskRegistrationEditDialogComponent,
      {
        data: element,
      }
    );

    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined) {
        if (data.id == 0) {
          this.handleRequest(this.registrationApi.create(data));
        } else {
          this.handleRequest(this.registrationApi.update(data));
        }
      } else {
        this.fetch();
      }
    });
  }
}
