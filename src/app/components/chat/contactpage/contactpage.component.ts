import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UsersService } from 'src/app/services/contacts/users.service';

@Component({
  selector: 'app-contactpage',
  templateUrl: './contactpage.component.html',
  styleUrls: ['./contactpage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactpageComponent implements OnInit {

  constructor(private _userService : UsersService) { 


  }

  ngOnInit() {
  }

}
