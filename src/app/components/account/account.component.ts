import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountDataService } from 'src/app/services/account/account-data.service';
import { AuthservicesService } from 'src/app/services/authservices.service';
import { Router } from '@angular/router';
import { OAuthUser } from 'src/app/Models/users';
import { Subscription } from 'rxjs';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UpdaterDialogComponent } from './image/updater-dialog/updater-dialog.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  public myData;

  private onAccountUpdate: Subscription;

  constructor(public dialog: MatDialog, private dataService: AccountDataService, private auth : AuthservicesService, private router : Router, private _snackBar: MatSnackBar) { 
    this.myData = [];

    this.onAccountUpdate =this.dataService.messageUpdate.subscribe( data => {
      if(data != null){
        setTimeout(() => this.showMessage(data.payload,"Close"), 500);
      }
    });
  }
  ngOnDestroy(): void {
    this.onAccountUpdate?.unsubscribe();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(UpdaterDialogComponent, {
      width: '75%'
    });

  }

  public get myProfile(){
    return this.auth.userProfile$;
  }

  private showMessage(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000
    });
  }

  ngOnInit() {
    this.showMessage("We're checking for updates","Close");
    setTimeout(() => this.dataService.checkMyself(), 500);
  }

  public get hasProfilePicture() : boolean{
    return this.dataService.profilePictureLoaded;
  }

  public get profilePicture(){
    return this.dataService.ProfilePicture;
  }


  public logout(){
    this.auth.logout();
    this.router.navigate(['/']);
  }

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#232837';

}
