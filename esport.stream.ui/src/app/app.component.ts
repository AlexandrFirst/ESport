import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(public cookieService: CookieService) {
      console.log(cookieService.getAll());
  }
  
  title = 'esport.stream.ui';
  
  ngOnInit(): void {
    
  }


}
