  
import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { JwtResponse } from 'app/model/JwtResponse';
import { TokenService } from 'app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  userLogged: SocialUser;
  isLogged: boolean;
  currenUserLogged: JwtResponse;

  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    // this.authService.authState.subscribe(
    //   data => {
    //     console.log("data authState",data);
    //     this.userLogged = data;
    //     this.isLogged = (this.userLogged != null && this.tokenService.getToken() != null);
    //   }
    // );

  
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.currenUserLogged = this.tokenService.getUser();
    }
    console.log(" isLogged ==>",this.isLogged);
    console.log(" currenUserLogged ===>",this.currenUserLogged);
  }

}
