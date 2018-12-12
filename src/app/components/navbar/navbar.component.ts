import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../provider/login.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  estaLogueado : boolean;

  constructor(private loginService:LoginService,private router: Router) { 
    this.estaLogueado = false; 
  }

  ngOnInit() {
  }

  desconectar(){
    this.loginService.logOut();
    this.router.navigate(['home']);
  }

  isLogued(){

    this.estaLogueado = this.loginService.isLogged();
    console.log(this.estaLogueado);
  }

 

}
