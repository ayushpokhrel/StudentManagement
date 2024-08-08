import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  cookieVal:any;
  welcomemsg:boolean=true;
  currentComponent: string = '';
  parsedCookie:any;
  welcomeUserName:any;


constructor(private router:Router, private api:APIService){
  this.cookieVal = this.getCookie("cookieval");
  this.parsedCookie=JSON.parse(this.cookieVal)
  this.welcomeUserName=this.parsedCookie.name;

  setTimeout(() => {
    this.welcomemsg = false;
  }, 5000);
}


private getCookie(name: string): string {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(cookieName) == 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}
showComponent(component: string) {
  this.currentComponent = component;
}

  Logout(){
    // alert('Sure to log out?')
    this.deleteCookie('cookieval');



  }

  private deleteCookie(name: string) {
    document.cookie = name + '=; Max-Age=-99999999;';
    this.router.navigate(['/login'])
  }




}
