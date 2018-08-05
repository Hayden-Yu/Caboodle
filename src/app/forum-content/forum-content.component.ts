import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ForumService } from '../common/services/forum.service';
import { CommentsService } from '../common/services/comments.service';
import { Forum } from '../common/models/forum';
import { Comments } from '../common/models/comments';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../common/services/user.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-forum-content',
  templateUrl: './forum-content.component.html',
  styleUrls: ['./forum-content.component.css']
})
export class ForumContentComponent implements OnInit {
  articleID: number;
  article: Forum;
  commentList: Comments;
  formComment: FormGroup;
  userID: number;

  constructor(  private _Activatedroute: ActivatedRoute,
    private router: Router,
    private forumService: ForumService,
    private formBuilder: FormBuilder,
    private commentsService: CommentsService,
    private userServices: UserService
  ) { }

  ngOnInit() {

    this._Activatedroute.params.subscribe(params => {
      this.articleID = params['id'];
    });

    this.forumService.getArticleById(this.articleID).subscribe(articles => {
      this.article = articles;
    });

    this.commentsService.getCommentsArticle(this.articleID).subscribe(comments => {
      this.commentList = comments;
    });

    this.userServices.getCurrentUser().subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.userID = user.id;
      }
    });
    this.formComment = this.formBuilder.group({Comment: ''});
  }

  invalidControl(formControlName: string): boolean {
    return this.formComment.get(formControlName).invalid
    && this.formComment.get(formControlName).touched;
  }

  submitForm() {
    if (isUndefined(this.userID)) {
      this.router.navigate(['/login']);
      return;
    }
    if (!this.formComment.valid) {
      this.formComment.get('Comment').markAsTouched();
      return;
    }
    this.commentsService.replyToThread({
      thread_id: this.articleID,
      description: this.formComment.get('Comment').value.trim(),
      user_id: this.userID
    }).subscribe(s => {
      this.commentList = s;
      location.reload();
    });
  }

}
