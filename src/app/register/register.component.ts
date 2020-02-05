import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../security/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  returnUrl: string;
  loading = false;
  submitted = false;
  error = '';

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) { }


  ngOnInit() {
   this.registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    nameSurname: ['', Validators.required],
    email: ['',Validators.required]

   })

   this.authenticationService.logout();
  }

  get f(){
    return this.registerForm.controls;
  }

  register(){

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.authenticationService.register(this.registerForm.value)
    .pipe(first())
    .subscribe(
      data=> {
        this.router.navigate(['/login']);
      },
      error => {
        this.error = error;
        this.loading = false;
    });
    
}

}