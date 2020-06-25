import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task.model';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
const BACKEND_URL = environment.apiUrl + "/tasks/";
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private completedtask: Task[] = [];
  private taskcompleted = new Subject<{ completedlist: Task[] }>();
  private taskadded = new Subject<{ tasklist: Task[] }>();
  constructor(private http: HttpClient) { }

  addtask(task) {
    task.index = this.tasks.length;
    this.http.post<{ message: String; data: any }>(BACKEND_URL, task).subscribe(res => {

      this.tasks.push(res.data);
      this.taskadded.next({
        tasklist: [...this.tasks]
      });
    });
  }

  gettask() {
    let completedlen = false;
    this.http.get<{ message: String; result: Task[]; Ctaskcount: Number; }>(BACKEND_URL).subscribe((res: any) => {

      this.tasks = res.result;
      console.log(this.tasks.length);
      this.taskadded.next({ tasklist: [...this.tasks] });
    });



    /*
    this.http.get<{ message: String; result: Task[]}>(BACKEND_URL+"/ctask").subscribe((res:any) =>{
      console.log(res.message);
      this.completedtask = res.result;
      this.taskcompleted.next({
        completedlist: [...this.completedtask]
      });
    });*/


  }

  completeTask(id: String) {
    const body = {
      id: id
    }
    this.http.put<{ message: String }>(BACKEND_URL, body).subscribe((res: any) => {
      console.log(res.message);
    });

  }
  markImportant(id: String, imp: Boolean) {
    const body = {
      id: id
    }
    if (imp) {
      this.http.put<{ message: String }>(BACKEND_URL+ "/nimp", body).subscribe( result =>{
        console.log(result.message);
      });
    } else {
      this.http.put<{ message: String }>(BACKEND_URL + "/imp", body).subscribe((result) => {
        console.log(result.message);
      });
    }
  }

  taskaddedListener() {
    return this.taskadded.asObservable();
  }
  taskcompletedListener() {
    return this.taskcompleted.asObservable();
  }

}
