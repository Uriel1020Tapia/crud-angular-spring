import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtResponse } from '../model/JwtResponse';
import { TokenDto } from '../model/token-dto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class OauthService {

  oauthURL ='http://localhost:8080/oauth/';
  
  constructor(private http: HttpClient) { }

  public google(tokenDto:TokenDto):Observable<JwtResponse>{
    return this.http.post<JwtResponse>(`${this.oauthURL}google`,tokenDto);
  }

  public facebook(tokenDto: TokenDto): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.oauthURL + 'facebook', tokenDto);
  }

  public login(credentials): Observable<any> {
    return this.http.post(this.oauthURL + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }
}
