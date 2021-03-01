import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IApiUserAuthenticated } from '@data/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: BehaviorSubject<IApiUserAuthenticated>;
  public nameUserLS = 'currentUserDev';


  constructor(
    private http:HttpClient,
    private router:Router
  ) {
    this.currentUser = new BehaviorSubject(
      JSON.parse(localStorage.getItem(this.nameUserLS))
    );
  }
  get getUser(): IApiUserAuthenticated{
    return this.currentUser.value;
  }
  login(
    data:{
      email:string;
      password:string;
    }
  ){

  }
}
