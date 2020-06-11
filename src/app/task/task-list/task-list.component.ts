import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  d
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  day;
  month;
  date;
  myDay: Boolean;
  tasks: Boolean;
  important: Boolean;
  toggle: Boolean;
  inputtoggle: Boolean;
  constructor() {
    this.d = new Date();
    this.day = this.days[this.d.getDay()];
    this.month = this.months[this.d.getMonth()];
    this.date = this.d.getDate();
    this.tasks = true;
    this.myDay = true;
    this.important = false;
    this.toggle = false;
    this.inputtoggle = false;
  }

  ngOnInit(): void {

  }
  togglefunc() {
    this.toggle = !this.toggle;
    if (this.toggle) {
      document.getElementById("sidenav").style.width = "200px";

    } else {
      document.getElementById("sidenav").style.width = "60px";
    }
  }
  navigate(x: String) {
    if(x === 'myDay'){
      this.myDay = true;
      this.important = false;
      this.tasks = false;
    }else if(x === 'important'){
      this.myDay = false;
      this.important = true;
      this.tasks = false;
    }else{
      this.myDay = false;
      this.important = false;
      this.tasks = true;
    }
  }
  inputclick(){

    this.inputtoggle = true;
  }

}
