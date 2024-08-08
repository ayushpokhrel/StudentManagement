import { APIService } from '../../api.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyResponse } from '../../interface/my-response.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  nameInvalidAndUntouched: boolean = false;
  emailInvalidAndUntouched: boolean = false;
  phoneInvalidAndUntouched: boolean = false;
  passwordInvalidAndUntouched: boolean = false;
  registrationSuccess: boolean = false;
  registrationUnSuccess: boolean = false;
  responseExample:any;
constructor(private fb:FormBuilder, private api:APIService){}

myform:FormGroup= this.fb.group({
  name:['',Validators.required],
  email:['',Validators.required],
  phone:['',Validators.required],
  password:['',Validators.required]
  })

Submit(){
const namecontrol=this.myform.get('name');
const emailcontrol=this.myform.get('email');
const phonecontrol=this.myform.get('phone');
const passwordcontrol=this.myform.get('password');
if (namecontrol) {
  this.nameInvalidAndUntouched = namecontrol.invalid && namecontrol.untouched || namecontrol.invalid && namecontrol.touched;
}

if (emailcontrol) {
  this.emailInvalidAndUntouched = emailcontrol.invalid && emailcontrol.untouched || emailcontrol.invalid && emailcontrol.touched;
}
if(phonecontrol){
  this.phoneInvalidAndUntouched= phonecontrol.invalid && phonecontrol.untouched || phonecontrol.invalid && phonecontrol.touched
}
if(passwordcontrol)
{
  this.passwordInvalidAndUntouched = passwordcontrol.invalid && passwordcontrol.untouched || passwordcontrol.invalid && passwordcontrol.touched;
}

if (this.myform.valid) {
  this.post();
}

}


post(){
  console.log(this.myform.value)
  return this.api.Register(this.myform.value).subscribe((response:MyResponse)=>{
   this.responseExample=response
   if(this.responseExample.success==true){
    this.registrationSuccess=true
    this.registrationUnSuccess=false
   }
   else if(this.responseExample.success==false){
    this.registrationUnSuccess=true;
    this.registrationSuccess=false;
   }

  })

}
}
