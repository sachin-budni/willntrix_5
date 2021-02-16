import { Component, OnInit } from '@angular/core';
import { DemoClassComponent } from 'src/app/demo-class/demo-class.component';
import { PlacementComponent } from 'src/app/placement/placement.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-layer1',
  templateUrl: './layer1.component.html',
  styleUrls: ['./layer1.component.scss']
})
export class Layer1Component implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDemoClass() {
    this.dialog.open(DemoClassComponent, { disableClose: true, data: { validate: false } });
  }
  openPlacement() {
    this.dialog.open(PlacementComponent, { disableClose: true });
  }

}
