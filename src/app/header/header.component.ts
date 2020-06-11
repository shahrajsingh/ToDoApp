import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth = true;
  constructor() { }

  ngOnInit(): void {
  }
  onSearch(form: NgForm){
    if(form.invalid){
      return;
    }
    alert(form.value.search);
  }
}
