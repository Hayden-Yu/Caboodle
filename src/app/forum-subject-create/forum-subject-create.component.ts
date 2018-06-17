import { Component, OnInit} from '@angular/core';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-forum-subject-create',
  templateUrl: './forum-subject-create.component.html',
  styleUrls: ['./forum-subject-create.component.css']
})
export class ForumSubjectCreateComponent implements OnInit {

 subjectValue : string;
 messageValue : string;

  constructor() {}

  ngOnInit() {
  }

  
}

/*export const environment: any = {
  host: 'http://localhost:6237/',
  jwtSecret: 'YES6cIESXE1cnzEzinJ1',
  captchaKey: '6LfldVwUAAAAAFN_5MV_mrcQnRN82trdGSpoT2we',
  logLevel: 'silly',
  database: {
    host: 'myvmlab.senecacollege.ca',
    username: 'caboodle',
    password: 'cX8qzpMsN6rb',
    database: 'shan',
    port: 6239
  },
  email: {
    username: 'caboodle.api@gmail.com',
    password: '%ThUvY1iE$Oh'
  }
}*/
