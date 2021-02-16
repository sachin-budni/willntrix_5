import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.scss']
})
export class ReferComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ReferComponent>) { }

  ngOnInit() {
  }
  

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  CloseReferPopup(){
    this.dialogRef.close();
  }

}
