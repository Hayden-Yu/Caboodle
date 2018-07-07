import { Component, OnInit} from '@angular/core';
import { ForumService } from '../common/services/forum.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum-subject-create',
  templateUrl: './forum-subject-create.component.html',
  styleUrls: ['./forum-subject-create.component.css']
})
export class ForumSubjectCreateComponent implements OnInit {

 subjectValue: string;
 messageValue: string;
 formForum: FormGroup;

  constructor(private forumService: ForumService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formForum = this.formBuilder.group({topic: [''], message: ['']});
  }

  submitForm() {
    this.forumService.createArticle(this.formForum.get('topic').value);
    this.router.navigate(['/forum']);
  }
}
