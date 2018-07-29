import { Component, OnInit, SimpleChange } from '@angular/core';
import { ForumService } from '../common/services/forum.service';
import { Forum } from '../common/models/forum';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})

export class ForumComponent implements OnInit {

  topicList: Forum;

  constructor(private forumService: ForumService) { }
  ngOnInit() {
    this.forumService.getArticleList().subscribe(topics => {
      this.topicList = topics;
      });
  }

}
