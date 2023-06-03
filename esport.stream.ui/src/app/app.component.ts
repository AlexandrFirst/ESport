import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public cookieService: CookieService, private theme: ThemeService) {
    console.log(cookieService.getAll());
  }

  title = 'esport.stream.ui';

  ngOnInit(): void {
    const local = this;
    window.addEventListener(
      "message",
      function (event) {
        let data = event.data;
        if (data != undefined && (data == 'light' || data == 'dark')) {
          console.log(data)
          local.theme.current = data;
        }

      },
      false
    );
  }
}
