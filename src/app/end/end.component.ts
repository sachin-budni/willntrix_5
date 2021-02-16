import { Component, OnInit } from '@angular/core';
import { DemoClassComponent } from '../demo-class/demo-class.component';
import { PlacementComponent } from '../placement/placement.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFormsComponent } from './../register-forms/register-forms.component';
@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  Courses = [
    { name: 'Excel', route: 'excel' },
    { name: 'VBA', route: 'VBA' },
    { name: 'SQL', route: 'sql' },
    { name: 'Tally ERP9', route: 'tally' }
  ];
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  enquiry() {
    this.dialog.open(DemoClassComponent, { disableClose: true, data: { validate: false } });
  }
  openRegister() {
    this.dialog.open(RegisterFormsComponent, { disableClose: true });
  }

}
