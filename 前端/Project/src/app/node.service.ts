import { Injectable } from '@angular/core';
import {Course} from './course';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';
import {MultipleQuestion} from './multiple-question';
import {ShortQuestion} from './short-question';
import {StuMultiple} from './stu-multiple';
import {StuShort} from './stu-short';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class NodeService {
  private baseUrl = 'http://10.222.129.245:8081/';
  tempUrl: string;

  constructor(
    private http: HttpClient) {

  }

  getMultiple(course_id: string, mindmap_id: string, node_id: string): Observable<MultipleQuestion[]> {
    this.tempUrl = this.baseUrl + 'multiples/' + course_id + '/' + mindmap_id + '/' + node_id;
    return this.http.get<MultipleQuestion[]>(this.tempUrl);
  }

  getShort(course_id: string, mindmap_id: string, node_id: string): Observable<ShortQuestion[]> {
    this.tempUrl = this.baseUrl + 'shorts/' + course_id + '/' + mindmap_id + '/' + node_id;
    return this.http.get<ShortQuestion[]>(this.tempUrl);
  }

  releaseMutiple(course_id: string, mindmap_id: string, node_id: string, multiple: MultipleQuestion): Observable<boolean> {
    this.tempUrl = this.baseUrl + 'release_multiple/' + course_id + '/' + mindmap_id + '/' + node_id;
    return this.http.post<boolean>(this.tempUrl, multiple, httpOptions);
  }

  releaseShort(course_id: string, mindmap_id: string, node_id: string, short: ShortQuestion): Observable<boolean> {
    this.tempUrl = this.baseUrl + 'release_short/' + course_id + '/' + mindmap_id + '/' + node_id;
    return this.http.post<boolean>(this.tempUrl, short, httpOptions);
  }

  getStuMultiple(course_id: string, mindmap_id: string, node_id: string): Observable<StuMultiple[]> {
    this.tempUrl = this.baseUrl + 'multiples/' + course_id + '/' + mindmap_id + '/' + node_id;
    return this.http.get<StuMultiple[]>(this.tempUrl);
  }

  getStuShort(course_id: string, mindmap_id: string, node_id: string): Observable<StuShort[]> {
    this.tempUrl = this.baseUrl + 'shorts/' + course_id + '/' + mindmap_id + '/' + node_id;
    return this.http.get<StuShort[]>(this.tempUrl);
  }
}
