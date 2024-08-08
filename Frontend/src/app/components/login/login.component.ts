import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from './../../api.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  emailInvalidAndUntouched: boolean = false;
  passwordInvalidAndUntouched: boolean = false;
  responseExample: any;
  isLoggedIn: boolean;
  userVal:any={}
  errorLoggin:boolean=false;

  constructor(private fb:FormBuilder ,private api:APIService, private router: Router){
    const loggedInCookie = this.getCookie('isLoggedIn');
    this.isLoggedIn = loggedInCookie === 'true';
  }



  myform:FormGroup= this.fb.group({
  email:['', Validators.required],
  password:['', Validators.required],
  })

  Send(){
const emailcontrol=this.myform.get('email');
const passwordcontrol=this.myform.get('password');

if (emailcontrol) {
  this.emailInvalidAndUntouched = emailcontrol.invalid && emailcontrol.untouched || emailcontrol.invalid && emailcontrol.touched;
}

if (passwordcontrol){
  this.passwordInvalidAndUntouched=passwordcontrol.invalid && passwordcontrol.untouched || passwordcontrol.invalid && passwordcontrol.touched;
}

if(this.myform.valid){
this.post();
}

  }

  post(){
    return this.api.Login(this.myform.value).subscribe((response)=>{
     this.responseExample=response

      if(this.responseExample.success){
        this.userVal={
          name: this.responseExample.username,
          isLoggedIn: true
        }
        var serializedData= JSON.stringify(this.userVal)
        this.isLoggedIn=true;
        this.setCookie("cookieval",serializedData, 30);
        this.router.navigate(['/dashboard'])

      }
      else{
        this.errorLoggin=true;
        alert('Error Logging in ')
      }
    })
  }
  logout(){
    this.isLoggedIn=false;
    this.deleteCookie('cookieVal');
  }

  private setCookie(name:string, data:any, expirationDays: number) {
    const date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${data};${expires};path=/`;
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

  private deleteCookie(name: string) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }
}
