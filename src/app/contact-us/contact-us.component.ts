import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as nodemailer from 'nodemailer';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
   rForm : FormGroup;
   post:any;
   fName:string = '';
   lName:string = '';
   email: string = '';
   issue:string = '';
   message:string = '';
   

  constructor(private fb: FormBuilder) { 
      this.rForm = fb.group({
        'fName': [null, Validators.required],
        'lName': [null, Validators.required],
        'email': [null, Validators.email],
        'issue': [null, Validators.required],
        'message': [null, Validators.compose([Validators.required, Validators.minLength(10),Validators.maxLength(400)])]
        
      })
  }
  addPost(post){
    this.fName = post.fName;
    this.lName = post.lName;
    this.email = post.email;
    this.issue = post.issue;
    this.message = post.message;
 /*   let transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25,
      auth:{
        user: 'CaboodleAPI123@gmail.com',
        pass: '12345678'

      },
      tls:{
        rejectUnauthorized: false
      }
    });*/
  
  }
}
