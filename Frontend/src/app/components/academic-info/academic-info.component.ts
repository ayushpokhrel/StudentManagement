import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';
import { Config } from 'datatables.net-dt';
import * as $ from 'jquery';


@Component({
  selector: 'app-academic-info',
  templateUrl: './academic-info.component.html',
  styleUrl: './academic-info.component.scss'
})
export class AcademicInfoComponent implements OnInit {

items:any;
academicinfo:any={};
saveAcademicinfo:any;

dtOptions:Config={}
ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      paging:true,
      language:{
      searchPlaceholder: "Search Data"

      }
    };


      this.api.getAcademicInfo().subscribe((res)=>{
        this.items=res
        console.log(this.items)
      })

    }

constructor(private api:APIService){}

  }
