import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { APIService } from '../../api.service';
import { AcademicInfo } from '../../interface/AcademicInfo.model';
import { PdfGeneratorService } from '../../pdf-generator.service';

@Component({
  selector: 'app-bill-entry',
  templateUrl: './bill-entry.component.html',
  styleUrl: './bill-entry.component.scss'
})

export class BillEntryComponent {
  vouchershow:boolean=false;
  pendingFee:any;
  toDeduct:any;
  fromDB:any;
  noexistingemail:boolean=false;
  academicinfo:AcademicInfo[]=[];
  saveAcademicinfo:AcademicInfo | undefined;

  amountForm:FormGroup=this.fb.group({
    name:[''],
    InvoiceType:[''],
    invoiceNumber:[''],
    invoiceDate:[''],
    amt:[''],
    installment:[''],
    email:['']
  })

  constructor(private fb:FormBuilder, private api: APIService, private pdfGenerator:PdfGeneratorService){}

  payBill(){
this.vouchershow=false;

this.api.getAcademicInfo().subscribe((res:any)=>{
  this.academicinfo=res;
  // console.log(this.academicinfo)
  this.saveAcademicinfo= this.academicinfo.find(data=>data.email===this.amountForm.value.email);
  if(!this.saveAcademicinfo){
  this.noexistingemail=true;
  }
  else{
    this.noexistingemail=false;
  }
  // console.log(this.saveAcademicinfo)
  this.toDeduct=Number(this.amountForm.value.amt);

  this.fromDB= Number(this.saveAcademicinfo?.fee) ;
  this.pendingFee= Number(this.fromDB-this.toDeduct);

  if(this.pendingFee>1)
  {
    this.vouchershow=true
  }

  })
}

downloadPdf()
{
  this.pdfGenerator.generatePdf('downloadbill', `Bill_receipt-${new Date().toLocaleTimeString().split(':')[2].split(' ')[0]}`);
}

}
