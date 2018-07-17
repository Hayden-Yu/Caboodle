import { Component, OnInit, SimpleChange } from '@angular/core';
import { ForumService } from '../common/services/forum.service';
import { Router } from '@angular/router';
import { List } from 'lodash';
import { Observable } from 'rxjs';
import { Forum } from '../common/models/forum';
import { User } from './../common/models/user';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})

export class ForumComponent implements OnInit {

  topicList: Forum;

  constructor(private forumService: ForumService) { }
  ngOnInit() {
    console.log('Before service');
    this.forumService.getArticleList().subscribe(topics => {
      this.topicList = topics;
      }
    );
    console.log('after service');
  }

}
