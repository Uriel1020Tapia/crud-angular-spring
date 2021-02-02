import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-h5',
  templateUrl: './title-h5.component.html',
  styleUrls: ['./title-h5.component.scss']
})
export class TitleH5Component implements OnInit {

  @Input() text = '';
  @Input() type: 'primary' | 'secondary' | 'success' |'danger' | 'warning' | 'dark' = 'primary';

  constructor() { }

  ngOnInit(): void {
  }

}
