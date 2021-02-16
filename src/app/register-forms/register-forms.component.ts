import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DemoClassComponent } from './../demo-class/demo-class.component';
import { PlacementComponent } from './../placement/placement.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-forms',
  templateUrl: './register-forms.component.html',
  styleUrls: ['./register-forms.component.scss']
})
export class RegisterFormsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<RegisterFormsComponent>,
              private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  demoDailog() {
    this.close();
    this.dialog.open(DemoClassComponent, { disableClose: true, data: { 'validate': false } });
  }

  openPlacement() {
    this.close();
    this.dialog.open(PlacementComponent, { disableClose: true });
  }

  navigate(nav: any) {
    this.close();
    this.router.navigate([nav]);
  }
}
