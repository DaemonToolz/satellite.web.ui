import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountDataService {
  public MyActivity = [
    {
      "name": "Votes",
      "value": 500
    },
    {
      "name": "Shared Posts",
      "value": 1200
    },
    {
      "name": "Comments",
      "value": 150
    },
    {
      "name": "Watched content",
      "value": 780
    }
  ];


  
  constructor() { }
}
