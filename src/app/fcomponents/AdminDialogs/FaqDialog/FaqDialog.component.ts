import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ProductService } from '../../../service/product.service'

@Component({
  selector: 'app-FaqDialog',
  templateUrl: './FaqDialog.component.html',
  styleUrls: ['./FaqDialog.component.css']
})
export class FaqDialogComponent implements OnInit {
  id:number;
  faqForm = {
    Question:'',
    Answer:''
  }
  status:string
  displayData:any
  title:string
  constructor(
    private dialogRef: MatDialogRef<FaqDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private productService : ProductService
  ) { 
    if(data.data){
      this.id = data.data['id']
      this.faqForm.Question = data.data['question']
      this.faqForm.Answer = data.data['answer']  
    }
    this.title = data.title
    this.status = data.action
  }

  ngOnInit() { 
  }
  save(){
    this.productService.updateFaq(this.id,this.faqForm).subscribe(
      (res)=>{
        this.dialogRef.close()
    },(error) =>{
      console.log(error)
    }
    )
  }
  create(){
    this.productService.addFaq(this.faqForm).subscribe(
      (res)=>{
      console.log(this.faqForm);
      this.dialogRef.close()
    },(error) =>{
      console.log(error)
    }
    )
  }
  close() {
    this.dialogRef.close();
  }

}
