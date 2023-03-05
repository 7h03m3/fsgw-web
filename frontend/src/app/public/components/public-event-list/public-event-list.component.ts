import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventDto } from '../../../shared/dtos/event.dto';
import { ActivatedRoute } from '@angular/router';
import { EventApiService } from '../../../api/event-api.service';
import { StringHelper } from '../../../shared/classes/string-helper';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EventCategoryApiService } from '../../../api/event-category-api.service';

@Component({
  selector: 'app-public-event-list',
  templateUrl: './public-event-list.component.html',
  styleUrls: ['./public-event-list.component.css'],
})
export class PublicEventListComponent {
  public dataSource = new MatTableDataSource<EventDto>();
  public displayedColumns: string[] = [
    'date',
    'title',
    'category',
    'location',
    'action',
  ];
  public title = 'Anlässe';
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(
    private route: ActivatedRoute,
    private eventApi: EventApiService,
    private categoryApi: EventCategoryApiService
  ) {}

  public ngOnInit(): void {
    const date = new Date();
    date.setHours(0, 0, 0);

    this.route.paramMap.subscribe((data) => {
      const categoryString = data.get('category');

      if (categoryString != null) {
        this.eventApi
          .getAllPublicByCategory(date.getTime(), categoryString)
          .subscribe((response) => {
            this.displayedColumns = ['date', 'title', 'location', 'action'];
            this.dataSource.data = response;
          });
        this.categoryApi
          .getByAbbreviation(categoryString)
          .subscribe((response) => {
            this.title = response.name;
          });
      } else {
        this.title = 'Alle Anlässe';
        this.displayedColumns = [
          'date',
          'title',
          'category',
          'location',
          'action',
        ];
        this.eventApi.getAllPublic(date.getTime()).subscribe((response) => {
          this.dataSource.data = response;
        });
      }
    });
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getDateString(event: EventDto): string {
    return StringHelper.getStartEndDateTimeString(event.start, event.end);
  }

  public getTimeString(event: EventDto): string {
    return StringHelper.getStartEndTimeString(event.start, event.end);
  }

  public getDayString(event: EventDto): string {
    return StringHelper.getDayOfWeekShort(event.start);
  }
}
