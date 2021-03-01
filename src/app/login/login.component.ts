import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { JwtResponse } from '../model/JwtResponse';
import { TokenDto } from '../model/token-dto';
import { OauthService } from '../services/oauth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  socialUser: SocialUser;
  userLogged: SocialUser;
  currenUserLogged: any;

  isLogged: boolean;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  submitted = false;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: SocialAuthService,
    private router: Router,
    private oauthService: OauthService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    // this.authService.authState.subscribe((data) => {
    //   this.userLogged = data;
    //   this.isLogged =this.userLogged != null && this.tokenService.getToken() != null;
    // });
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.currenUserLogged = this.tokenService.getUser();
      this.goToHome();
    }
    console.log(" isLogged ==>",this.isLogged);
    console.log(" currenUserLogged ===>",this.currenUserLogged);
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      password: [''],
      username: [''],

    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    console.info('request ==>!' , this.loginForm.value);
    this.oauthService.login(this.loginForm.value).subscribe(
      data => {
        console.log("resp login==>",data);
        this.tokenService.saveToken(data.accessToken);
        this.tokenService.saveUser(data);

        this.isLoginFailed = false;
        this.isLogged = true;
        this.roles = this.tokenService.getUser().roles;
        this.goToHome();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLogged = true;
      }
    );
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((data) => {
        console.log('data google==>', data);
        this.socialUser = data;
        const tokenGoogle = new TokenDto(this.socialUser.idToken);

        console.log("tokenGoogle ==>",tokenGoogle);

        this.oauthService.google(tokenGoogle).subscribe(
          (res:JwtResponse) => {
            console.log("resp google",res)
            this.tokenService.saveToken(res.accessToken);
            this.tokenService.saveUser(res);
            this.isLogged = true;
            this.goToHome();
          },
          (err) => {
            console.log(err);
            this.logOut();
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const tokenFace = new TokenDto(this.socialUser.authToken);
        this.oauthService.facebook(tokenFace).subscribe(
          (res:JwtResponse) => {
            console.log("resp google",res)
            this.tokenService.saveToken(res.accessToken);
            this.tokenService.saveUser(res);
            this.isLogged = true;
            this.goToHome();
          },
          err => {
            console.log(err);
            this.logOut();
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  logOut(): void {
    this.authService.signOut().then((data) => {
      this.tokenService.logOut();
      this.isLogged = false;
    });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
