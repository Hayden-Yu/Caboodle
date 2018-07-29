import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { EMAIL_REGEX } from '../common/constants';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

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

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
      this.rForm = this.fb.group({
        'fName': [null, Validators.required],
        'lName': [null, Validators.required],
        'email': [null, Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])],
        'issue': [null, Validators.required],
        'message': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(400)])]
      });
  }
  // when submitting the form, it should automatically send confirmation email to client and an email to caboodle email.
  submitForm() {
    // this is getting a password. How to send?
    return this.http.get(`${environment.api}activation?email=${encodeURI(this.email)}`, {observe: 'response'});
  }
  addPost(post) {
    this.fName = post.fName;
    this.lName = post.lName;
    this.email = post.email;
    this.issue = post.issue;
    this.message = post.message;

  }
}
