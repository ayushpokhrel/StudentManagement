import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';
import { Config } from 'datatables.net-dt';
import * as $ from 'jquery';
import { AcademicInfo } from '../../interface/AcademicInfo.model';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss'
})
export class StudentDetailsComponent implements OnInit {

items:any;
academicinfo:AcademicInfo[]=[];
saveAcademicinfo:AcademicInfo | undefined;
saveAcademicinfo2:AcademicInfo | undefined;
formshow:boolean=false;
pendingFee:any;


dtOptions:Config={}
ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      paging:true,
      language:{
      searchPlaceholder: "Search Data"

      }
    };


      this.api.getStudents().subscribe((res)=>{
        this.items=res
      })

    }


    academygroup:FormGroup=this.fb.group({
    email:[''],
    degree:[''],
    enrolledyear:[''],
    enrolledprogram:[''],
    currentsemester:['']
    })


constructor(private api:APIService, private fb:FormBuilder){}

viewInfo(email:any){
this.api.getAcademicInfo().subscribe((res:any)=>{

  this.academicinfo=res;
  this.saveAcademicinfo = this.academicinfo.find(data => data.email === email);
  console.log(this.saveAcademicinfo)


  this.academygroup.patchValue({
    degree:this.saveAcademicinfo?.degree,
    enrolledyear:this.saveAcademicinfo?.enrolledYear,
    enrolledprogram:this.saveAcademicinfo?.enrolledProgram,
    currentsemester:this.saveAcademicinfo?.currentSemester
  })
})

}

viewFee(email:any){
this.api.getAcademicInfo().subscribe((res:any)=>{
  this.academicinfo=res;
  this.saveAcademicinfo2= this.academicinfo.find(data=>data.email===email);

  this.pendingFee=this.saveAcademicinfo2?.fee;
  console.log(this.pendingFee)
})
}


  }





