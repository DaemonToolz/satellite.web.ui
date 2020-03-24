import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UsersService } from 'src/app/services/contacts/users.service';
import { AccountDataService } from 'src/app/services/account/account-data.service';
import { Subscription, Observable } from 'rxjs';
import { UserInfo } from 'src/app/Models/users';

@Component({
  selector: 'app-contactpage',
  templateUrl: './contactpage.component.html',
  styleUrls: ['./contactpage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactpageComponent implements OnInit {

  private _onChecked : Subscription;

  constructor(public _userService : UsersService, private _myUserInfo : AccountDataService) { 
    this._onChecked = this._myUserInfo.checkedUpdate.subscribe(data => {
      if(data){
        this.fetchMyNetwork()
      }
    });

    if(this._myUserInfo.isChecked){
      this.fetchMyNetwork()
    }
  }

  ngOnInit() {
  }

  private fetchMyNetwork(){
    this._myUserInfo.getMyNetwork().subscribe(data => {
      console.log(data)
    });
  }

}
