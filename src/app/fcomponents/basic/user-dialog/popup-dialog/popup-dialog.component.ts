import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ProductService } from '../../../../service/product.service';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.css']
})
export class PopupDialogComponent implements OnInit {
  informationForm: FormGroup


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<[PopupDialogComponent]>, private productservice: ProductService) { }

  ngOnInit() {
    this.informationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email
      ]],
      phone: ['', [Validators.required
      ]],
      channel: ['']
    })
  }
  onSubmit() {
      const contact={
        Email:this.email.value,
        PhoneNumber:this.phone.value,
        FindUs:this.channel.value
      }
      console.log(contact)
      this.productservice.popupContacts(contact).subscribe(
        res=>{
          console.log(res)
        },
        err=>{
          console.log(err)
        }
      )
      this.dialogRef.close()
  }
  get email() { return this.informationForm.get('email') };
  get phone() { return this.informationForm.get('phone') };
  get channel() {return this.informationForm.get('channel')}
  getErrorMessage() {
    return this.email.hasError('required') ? 'Please enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : ''
  }
  getErrorMessage2() {
    return this.phone.hasError('required') ? 'Please enter a value' : ''
  }
}
