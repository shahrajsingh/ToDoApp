import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../task.model';
import { Subscription } from "rxjs";
import { TaskService } from '../task.service';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  d
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  day:String ="";
  month:String ="";
  date:String ="";
  tasksub = new Subscription();
  completedsub = new Subscription();
  myDay: Boolean;
  tasks: Boolean;
  important: Boolean;
  toggle: Boolean;
  inputtoggle: Boolean;
  tasklist: Task[] = [];
  completed: Task[] = [];
  arrow: String = "keyboard_arrow_right";
  arrowtoggle: Boolean = false;
  constructor(private taskService: TaskService, public dialog: MatDialog) {
    this.d = new Date();
    this.day += this.days[this.d.getDay()];
    this.month += this.months[this.d.getMonth()];
    this.date += this.d.getDate();
    this.tasks = false;
    this.myDay = true;
    this.important = false;
    this.toggle = false;
    this.inputtoggle = false;
  }

  ngOnInit(): void {
    //alert("the website is currently in development phase,designed for desktop screens of aspect ratio 16:9 and 1920X1080 resolution");
    this.tasksub = this.taskService.taskaddedListener().subscribe(res => {
      this.tasklist = res.tasklist;
    });
    this.completedsub = this.taskService.taskcompletedListener().subscribe( res =>{
      this.completed = res.completedlist;
    });
    this.taskService.gettask();

  }

  togglefunc() {

    this.toggle = !this.toggle;
    if (this.toggle) {
      document.getElementById("sidenav").style.width = "200px";
      document.getElementById("sidenav").style.transition = "0.5s";
      document.getElementById("col2").style.transition = "0.5s";
      document.getElementById("col2").style.paddingLeft = "200px";
      if(window.matchMedia("(max-width: 400px)")){
        //document.getElementById("col2").style.display = "none";
        console.log(true);
      }

    } else {
      document.getElementById("sidenav").style.width = "50px";
      document.getElementById("col2").style.paddingLeft = "50px";
      if(window.matchMedia("(min-width: 0px) and (max-width: 400px)")){
        document.getElementById("col2").style.display = "initial";
      }
    }
  }
  navigate(x: String) {
    if (x === 'myDay') {
      this.myDay = true;
      this.important = false;
      this.tasks = false;
    } else if (x === 'important') {
      this.myDay = false;
      this.important = true;
      this.tasks = false;
    } else {
      this.myDay = false;
      this.important = false;
      this.tasks = true;
    }
  }


  complete(ctask: Task) {
    this.taskService.completeTask(ctask._id);

  }
  listcomplete() {

    this.arrowtoggle = !this.arrowtoggle;

    if (this.arrowtoggle) {
      document.getElementById("icon").style.transform = "rotate(90deg)";

    } else {
      document.getElementById("icon").style.transform = "rotate(0deg)";
    }
  }
  markimportant(task: Task){
    this.tasklist[task.index].important = true;
    this.taskService.markImportant(task._id);
  }
}
