import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-updater-dialog',
  templateUrl: './updater-dialog.component.html',
  styleUrls: ['./updater-dialog.component.scss']
})
export class UpdaterDialogComponent  {

  constructor( public dialogRef: MatDialogRef<UpdaterDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}



}
