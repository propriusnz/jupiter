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
  isLoading:boolean = false
  status:string
  displayData:any
  title:string
  constructor(
    private dialogRef: MatDialogRef<FaqDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private productService : ProductService
  ) { 
    if(data.data){
      // fill in faq form
      this.id = data.data['id']
      this.faqForm.Question = data.data['question']
      this.faqForm.Answer = data.data['answer']  
    }
    this.title = data.title
    this.status = data.action
  }

  ngOnInit() { 
  }
  // save changes to faq
  save(){
    this.isLoading = true
    this.productService.updateFaq(this.id,this.faqForm).subscribe(
      (res)=>{
        this.isLoading = false
        this.dialogRef.close()
    },(error) =>{
      this.isLoading = false
      console.log(error)
    }
    )
  }
  // create new faq
  create(){
    this.isLoading = true
    this.productService.addFaq(this.faqForm).subscribe(
      (res)=>{
      this.isLoading = false
      this.dialogRef.close()
    },(error) =>{
      this.isLoading = false
      console.log(error)
    }
    )
  }
  // close this dialog
  close() {
    this.dialogRef.close();
  }

}
