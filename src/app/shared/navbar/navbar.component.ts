import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public contents : any[] = [];

  constructor(public router: Router) { 
    for(let i = 0; i < 650; ++i){
      this.contents.push( {id:i, name: "User#"+i, lastMessage: "HELLO"});
    }
  }

  ngOnInit() {
  }

  open(chatId: number){

    this.router.navigate(['/chat', chatId]);
  }
}
