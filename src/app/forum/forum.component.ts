import { Component, OnInit, SimpleChange } from '@angular/core';
import { ForumService } from '../common/services/forum.service';
import { Router } from '@angular/router';
import { List } from 'lodash';
import { Observable } from 'rxjs';
import { Forum } from '../../api/core/models/forum.model';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})

export class ForumComponent implements OnInit {

  topicList: List<String> = ['first', 'string[]'];

  constructor(private forumService: ForumService) { }
  ngOnInit() {
    this.forumService.getArticleList().subscribe(topics => {
      this.topicList = topics;
    }
    );
  }

}
