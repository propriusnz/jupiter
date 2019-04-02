import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-adminDialog',
  templateUrl: './adminDialog.component.html',
  styleUrls: ['./adminDialog.component.css']
})
export class AdminDialogComponent implements OnInit {

  //form: FormGroup;
  description:string;
  typeCode:string;
  displayData:any;
  faqForm = {
    Question:'',
    Answer:''
  }
  constructor(
    //private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.description = data.title;
    this.typeCode = data.category;
    this.displayData = data.data;
  }

  ngOnInit() {
    console.log(this.displayData);
  //   this.form = this.fb.group({
  //     description: [this.description, []],
  // });
  }

  save() {
    //this.dialogRef.close(this.form.value);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }


}
