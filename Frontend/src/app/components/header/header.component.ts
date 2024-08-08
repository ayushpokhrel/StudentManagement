import { Component } from '@angular/core';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
cookieVal:any;
isloggedIn:boolean=false;
constructor(private api:APIService){
  // this.isloggedIn = this.cookieExists('cookieVal');

}

// private cookieExists(name: string): boolean {
//   const cookieName = `${name}=`;
//   const cookies = document.cookie.split(';');
//   return cookies.some(cookie => cookie.trim().startsWith(cookieName));
// }

  // private getCookie(name: string): string {
  //   const cookieName = name + "=";
  //   const decodedCookie = decodeURIComponent(document.cookie);
  //   const cookieArray = decodedCookie.split(';');
  //   for (let i = 0; i < cookieArray.length; i++) {
  //     let cookie = cookieArray[i].trim();
  //     if (cookie.indexOf(cookieName) == 0) {
  //       return cookie.substring(cookieName.length, cookie.length);
  //     }
  //   }
  //   return "";
  // }
}
