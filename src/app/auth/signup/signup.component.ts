import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading: Boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => this.isLoading = false, 1000);

  }
  signup(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.authService.signup(form.value.name, form.value.email, form.value.password);
    }

  }

}
