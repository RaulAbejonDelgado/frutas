import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../provider/login.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService:LoginService,private router: Router) { }

  ngOnInit() {
  }

  desconectar(){
    this.loginService.logOut();
    this.router.navigate(['home']);
  }

}
