import { Component, OnInit } from '@angular/core';
import { CAROUSEL_DATA_ITEMS } from '@data/constants/carousel.const';
// import { USERS_DATA } from '@data/constants/user.const';
import { UserService } from '@data/services/api/user.service';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';
import { ICarouselItem } from '@shared/components/carousel/Icarousel-item.metadata';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

   textTitle ='List users';
   public users:ICardUser[]; //= USERS_DATA;
   public carouselData: ICarouselItem[] = CAROUSEL_DATA_ITEMS;

   public model = null;
   public model2 = null;

  constructor( private userService:UserService) {
    this.userService.getAllUsers().subscribe( r => {
      if(!r.error){
        this.users = r.data;
      }
    })
  }

  ngOnInit(): void {
  }

  upload(){
    console.log(this.model);
    console.log(this.model2);

  }
}
