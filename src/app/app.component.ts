import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from './service/user.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { AddUserComponent } from './add-user/add-user.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit  {

  displayedColumns: string[] = ['firstname', 'lastname', 'email'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialogue:MatDialog, private _userService: UserService) {}

  openAddUserDialog() {
    this._dialogue.open(AddUserComponent)
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers() {
    this._userService.getUsers().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    });
  }
}

