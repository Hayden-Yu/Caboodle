import { Component, OnInit} from '@angular/core';
import { ForumService } from '../common/services/forum.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../common/services/user.service';
import { Forum } from '../common/models/forum';

@Component({
  selector: 'app-forum-subject-create',
  templateUrl: './forum-subject-create.component.html',
  styleUrls: ['./forum-subject-create.component.css']
})
export class ForumSubjectCreateComponent implements OnInit {
 formForum: FormGroup;
 user_ID: number;
 listForum: Forum;        // console.log is all debugging/testing purposes


  constructor(private forumService: ForumService, private router: Router, private formBuilder: FormBuilder,
    private userService: UserService) {}

  ngOnInit() {
    console.log('Form Create Page');
    this.userService.getCurrentUser().subscribe(user => {
      if (!user) {
        console.log('Not user on init');
        this.router.navigate(['/login']);
      }
    });
    this.userService.loggedIn$.subscribe(loggedIn => {
      if (!loggedIn) {
        console.log('not logged in on init');
        this.router.navigate(['/login']);
      }
    });
    this.formForum = this.formBuilder.group({Topic: '', Message: ''});
  }

  submitForm() {
    console.log('Form Submitted');
    this.userService.getCurrentUser().subscribe(user => {
      if (!user) {
        console.log('Not user');
        this.router.navigate(['/login']);
      } else {
        console.log('Is user');
        this.user_ID = user.id;
      }
    });
    console.log('Before Create Article Service Call');
    this.forumService.createArticle({
      title: this.formForum.get('Topic').value,
      description: this.formForum.get('Message').value,
      user_id: this.user_ID
    })
    .subscribe(result => {
      console.log('In subscribe');
      this.listForum = result;    // testing purposes
      this.router.navigate(['/forum']);
    });
    console.log('end of form submit---');
  }
}
