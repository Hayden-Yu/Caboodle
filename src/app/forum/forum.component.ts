import { Component, OnInit, SimpleChange } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { toDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})

export class ForumComponent implements OnInit {

  topicList: any[] = [
    {
      subject: 'Introduction',
      user: 'Caboodle',
      date: '2018-06-15',
      link: '/forum-content'
    },
    {
      subject: 'API Suggestion',
      user: 'Caboodle',
      date: '2018-06-16',
      link: '/forum-content'
    }
  ];

  constructor() { }
  ngOnInit() {
  }

  setTopic(newSubject, newMessage) {
    this.topicList.unshift({
      subject: newSubject,
      user: 'Caboodle (New)',
      date: '2018-06-15',
      link: '/forum-subject-create'
    });
  }

}
