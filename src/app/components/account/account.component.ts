import { Component, OnInit } from '@angular/core';
import { AccountDataService } from 'src/app/services/account/account-data.service';
import { AuthservicesService } from 'src/app/services/authservices.service';
import { Router } from '@angular/router';
import { OAuthUser } from 'src/app/Models/users';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public myData;

  constructor(private dataService: AccountDataService, private auth : AuthservicesService, private router : Router) { 
    this.myData = this.dataService.MyActivity;
  }

  public get myProfile(): OAuthUser{
    return this.auth.myProfile;
  }

  ngOnInit() {
    
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
