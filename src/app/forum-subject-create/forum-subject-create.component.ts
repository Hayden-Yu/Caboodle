import { Component, OnInit} from '@angular/core';
import { ForumService } from '../common/services/forum.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../common/services/user.service';
import { Forum } from '../common/models/forum';
import { isUndefined } from 'util';
import { User } from '../common/models/user';

@Component({
  selector: 'app-forum-subject-create',
  templateUrl: './forum-subject-create.component.html',
  styleUrls: ['./forum-subject-create.component.css']
})
export class ForumSubjectCreateComponent implements OnInit {
 formForum: FormGroup;
 userID: number;
 curUser: User;


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
        this.curUser =  user;
      }
    });
    this.formForum = this.formBuilder.group({Topic: '', Message: ''});
  }

  invalidControl(formControlName: string): boolean {
    return this.formForum.get(formControlName).invalid
    && this.formForum.get(formControlName).touched;
  }

  submitForm() {
    if (isUndefined(this.userID)) {
      this.router.navigate(['/login']);
      return;
    }
    if (!this.formForum.valid) {
      this.formForum.get('Topic').markAsTouched();
      this.formForum.get('Message').markAsTouched();
      return;
    }
    this.forumService.createArticle({
      title: this.formForum.get('Topic').value.trim(),
      description: this.formForum.get('Message').value.trim(),
      user_id: this.curUser.id
    })
    .subscribe(result => {
      this.router.navigate(['/forum']);
    });
  }
}
