import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private taskadded = new Subject<{ tasklist: Task[] }>();
  constructor(private http: HttpClient) { }

  addtask(task) {
    task.index = this.tasks.length;
    this.http.post<{ message: String; data: any }>("http://localhost:3000/api/tasks", task).subscribe(res => {

      this.tasks.push(res.data);
      this.taskadded.next({
        tasklist: [...this.tasks]
      });
    });
  }

  gettask() {
    this.http.get<{}>("http://localhost:3000/api/tasks").subscribe((res: Task[]) => {
      this.tasks = res;
      this.taskadded.next({ tasklist: [...this.tasks] });
    });
  }

  taskaddedListener() {
    return this.taskadded.asObservable();
  }

}
