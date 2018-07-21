import { Component, OnInit} from '@angular/core';
import { ForumService } from '../common/services/forum.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../common/services/user.service';
import { Forum } from '../common/models/forum';
import { isUndefined } from 'util';

@Component({
  selector: 'app-forum-subject-create',
  templateUrl: './forum-subject-create.component.html',
  styleUrls: ['./forum-subject-create.component.css']
})
export class ForumSubjectCreateComponent implements OnInit {
 formForum: FormGroup;
 userID: number;


  constructor(private forumService: ForumService, private router: Router, private formBuilder: FormBuilder,
    private userServices: UserService) {}

  ngOnInit() {
    this.userServices.loggedIn$.subscribe(loggedIn => {
      if (!loggedIn) {
        this.router.navigate(['/login']);
      }
    });
    this.userServices.getCurrentUser().subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.userID = user.id;
      }
    });
    this.formForum = this.formBuilder.group({Topic: '', Message: ''});
  }

  submitForm() {
    console.log('Form Submitted---');
    console.log('Before Create Article Service Call');
    console.log('topic--- ' + this.formForum.get('Topic').value);
    console.log('message--- ' + this.formForum.get('Message').value);
    console.log('user_id--- ' + this.userID);
    if (isUndefined(this.userID)) {
      this.router.navigate(['/login']);
      return;
    }
    this.forumService.createArticle({
      title: this.formForum.get('Topic').value,
      description: this.formForum.get('Message').value,
      user_id: this.userID
    })
    .subscribe(result => {
      this.router.navigate(['/forum']);
    });
    console.log('end of form submit---');
  }
}
