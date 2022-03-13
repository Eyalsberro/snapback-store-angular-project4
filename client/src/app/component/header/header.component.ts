import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _user:UserService) { }

  // firstname = this._user.userinfo[0].firstName

  ngOnInit(): void {
    // this._user.getUserData(localStorage['userID'])
  }

}
