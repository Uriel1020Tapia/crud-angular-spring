import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { USERS_DATA } from '@data/constants/user.const';
import { UserService } from '@data/services/api/user.service';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public textTitle="Detail User"
  public id:number;
  public users:ICardUser[];
  public currentUser: ICardUser;

  constructor(
    private route:ActivatedRoute,
    private userService:UserService) {
    this.id = +this.route.snapshot.params.id;
    // this.currentUser = this.users.find(user => user.id === +this.id);//con el + lo convertimos a un numero
  }

  ngOnInit(): void {
    this.userService.getUserById(this.id).subscribe( r => {
      if(!r.error){
        this.currentUser = r.data;
      }
    });
  }
}
