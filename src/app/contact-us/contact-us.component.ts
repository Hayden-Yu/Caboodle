import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { EMAIL_REGEX } from '../common/constants';
import { HttpClient } from '@angular/common/http';
import { ContactService } from './../common/services/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  http: HttpClient;
   rForm: FormGroup;
   post: any;
   fName;
   lName;
   email;
   issue;
   message;

  constructor(private fb: FormBuilder, private router: Router, private contactService: ContactService) { }

  ngOnInit() {
      this.rForm = this.fb.group({
        'fName': [null, Validators.required],
        'lName': [null, Validators.required],
        'email': [null, Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])],
        'issue': [null, Validators.required],
        'message': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(400)])]
      });
  }
  submitForm() {
    this.contactService.contactMail({
      firstName: this.rForm.get('firstName').value.trim(),
      lastName: this.rForm.get('lastName').value.trim(),
      email: this.rForm.get('email').value.trim(),
      issue: this.rForm.get('issue').value.trim(),
      message: this.rForm.get('message').value.trim()
    });
  }
  addPost(post) {
    this.fName = post.fName;
    this.lName = post.lName;
    this.email = post.email;
    this.issue = post.issue;
    this.message = post.message;

  }
}
