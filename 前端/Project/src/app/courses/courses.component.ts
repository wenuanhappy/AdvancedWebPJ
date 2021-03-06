import { Component, OnInit } from '@angular/core';
import {CourseService} from '../course.service';
import {Course} from '../course';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ModifyPasswordComponent} from '../modify-password/modify-password.component';
import '../../assets/bootstrap/js/bootstrap.js';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  user_name: string;
  courses: Course[];
  course: Course = new Course;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private location: Location,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user_name = window.sessionStorage.getItem('user_name');
    this.getCourses();
  }

  // 获取课程列表
  getCourses() {
    this.courseService.getCourses(window.sessionStorage.getItem('user_name'), window.sessionStorage.getItem('identity')).subscribe(
      value => this.setCourses(value));
  }

  setCourses(value) {
    this.courses = value;
  }

  // 进入课程对应的教师思维导图页
  enterCourse(course_id: string) {
    window.sessionStorage.setItem('course_id', course_id);
    this.router.navigate(['main']);
  }

  // 修改密码
  modifyPwd(): void {
    this.modalService.open(ModifyPasswordComponent);
  }

  // 登出，清除sessionStorage
  loginOut(): void {
    window.sessionStorage.clear();
    this.router.navigate(['']);
  }

  // 教师添加课程
  onSubmit() {
    this.courseService.addCourse(this.course, window.sessionStorage.getItem('user_name'))
      .subscribe((value => this.checkSuccess(value['success'])));
  }

  // 检查是否添加成功
  checkSuccess(value) {
    if (value) {
      window.alert('添加成功!');
      // 更新课程列表
      this.getCourses();
      // 清空新增课程信息
      this.course = new Course();
    } else {
      window.alert('课程Id已存在!');
    }
  }
}
