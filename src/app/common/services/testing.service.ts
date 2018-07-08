import { Subject, Observable, of, observable } from 'rxjs';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';
import { Endpoint } from '../models/endpoint';



@Injectable({
    providedIn: 'root'
  })
  export class TestingService {

    constructor(private http: HttpClient) {
    }
}
