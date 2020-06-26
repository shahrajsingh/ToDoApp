import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../task.model';
import { Subscription } from "rxjs";
import { TaskService } from '../task.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  isLoading: Boolean;
  d
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  day: String = "";
  month: String = "";
  date: String = "";
  tasksub = new Subscription();
  completedsub = new Subscription();
  myDay: Boolean;
  tasks: Boolean;
  important: Boolean;
  toggle: Boolean;
  inputtoggle: Boolean;
  tasklist: Task[] = [];
  completedlen: Boolean;
  arrow: String = "keyboard_arrow_right";
  arrowtoggle: Boolean = false;
  audio;
  constructor(private taskService: TaskService, public dialog: MatDialog) {
    this.d = new Date();
    this.day += this.days[this.d.getDay()];
    this.month += this.months[this.d.getMonth()];
    this.date += this.d.getDate();
    this.tasks = true;
    this.myDay = false;
    this.important = false;
    this.toggle = false;
    this.inputtoggle = false;
    this.completedlen = false;
    this.audio = new Audio();
    this.audio.src = "../Completed.wav";
    this.audio.load();

  }

  ngOnInit(): void {
    this.taskService.gettask();
    //alert("the website is currently in development phase,designed for desktop screens of aspect ratio 16:9 and 1920X1080 resolution");
    this.tasksub = this.taskService.taskaddedListener().subscribe(res => {
      this.tasklist = res.tasklist;
      const len = this.tasklist.length;
      for (let a = 0; a < len; a++) {
        if (this.tasklist[a].status == true) {
          this.completedlen = true;
          break;
        }
      }

    });

    /*this.completedsub = this.taskService.taskcompletedListener().subscribe(res => {
      this.completed = res.completedlist;
      console.log(this.completed);
    });*/
    
    

  }

  togglefunc() {

    this.toggle = !this.toggle;
    if (this.toggle) {
      document.getElementById("sidenav").style.width = "200px";
      document.getElementById("sidenav").style.transition = "0.5s";
      document.getElementById("col2").style.transition = "0.5s";
      document.getElementById("col2").style.paddingLeft = "200px";
      if (window.matchMedia("(max-width: 400px)")) {
        //document.getElementById("col2").style.display = "none";
        console.log(true);
      }

    } else {
      document.getElementById("sidenav").style.width = "50px";
      document.getElementById("col2").style.paddingLeft = "50px";
      if (window.matchMedia("(min-width: 0px) and (max-width: 400px)")) {
        document.getElementById("col2").style.display = "initial";
      }
    }
  }
  navigate(x: String) {
    if (x === 'myDay') {
      this.taskService.getmyDaytask();
      this.myDay = true;
      this.important = false;
      this.tasks = false;
    } else if (x === 'important') {
      this.taskService.getimptask();
      this.myDay = false;
      this.important = true;
      this.tasks = false;
    } else {
      this.taskService.gettask();
      this.myDay = false;
      this.important = false;
      this.tasks = true;
    }
  }


  complete(ctask: Task) {
    this.completedlen = true;
    this.audio.play();
    this.taskService.completeTask(ctask._id);
    this.tasklist[ctask.index].status = true;
  }


  listcomplete() {

    this.arrowtoggle = !this.arrowtoggle;

    if (this.arrowtoggle) {
      document.getElementById("icon").style.transform = "rotate(90deg)";

    } else {
      document.getElementById("icon").style.transform = "rotate(0deg)";
    }
  }


  markimportant(task: Task) {
    if (task.important) {
      this.taskService.markImportant(task._id, task.important);
      this.tasklist[task.index].important = false;
    } else {

      this.taskService.markImportant(task._id, task.important);
      this.tasklist[task.index].important = true;
    }

  }
}
