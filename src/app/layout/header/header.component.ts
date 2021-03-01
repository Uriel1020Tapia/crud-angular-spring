import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenService } from 'app/services/token.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userLogged: SocialUser;
  currenUserLogged: any;
  
  isLogged: boolean;

  constructor(
    private authService: SocialAuthService,
    private  router:Router,
    private tokenService: TokenService
  ) { 

  }

  ngOnInit(): void {
    // this.authService.authState.subscribe(
    //   data => {
    //     console.log("data authService ==>",data);
    //     console.log("this.tokenService.getToken() ==>",this.tokenService.getToken());
    //     this.userLogged = data;
    //     this.isLogged = (this.userLogged != null && this.tokenService.getToken() != null);
    //     this.currenUserLogged = this.tokenService.getUser();
    //   }
    // );

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.currenUserLogged = this.tokenService.getUser();
    }
    console.log(" isLogged ==>",this.isLogged);
    console.log(" currenUserLogged ===>",this.currenUserLogged);
  }
  
  logOut(): void {
    // this.authService.signOut().then(
    //   data => {
    //     this.tokenService.logOut();
    //     this.router.navigate(['/login']);
    //   }
    // );
    this.tokenService.logOut();
  }

}
