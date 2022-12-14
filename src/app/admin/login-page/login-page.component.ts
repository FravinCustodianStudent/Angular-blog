import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {User} from "../../shared/interfaces";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form!:FormGroup
  submitted: boolean = false;
  message!:string
  constructor(public auth:AuthService,
               private router:Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:Params)=>{
      if (params['loginAgain']){
        this.message = "Login again"
      }else if(params['authFailed']){
        this.message = 'Session is end.Login again'
      }
    })
    this.form = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  submit() {
    if(this.form.invalid){
      return
    }
    this.submitted=true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: null!
    }
    this.auth.login(user).subscribe(()=>{
      this.form.reset()
      this.submitted=false;
      this.router.navigate(['/admin','dashboard'])
    },()=>{
      this.submitted = false;
    })
  }
}
