import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from '../../../api-service.service';
import { StorageService } from '../../../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _api: ApiServiceService,
    private _storage: StorageService ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get formControls() { return this.loginForm.controls; }

  login() {
    
    if(true) {

      const params = { url: 'login', data: {username: this.loginForm.value.email, password: this.loginForm.value.password}};

      this._api.post(params).subscribe(result => {  
        console.log(result);
        let storage = this._storage.setStorageItem('loggedUser', result, 'local');
        if(storage) {
          this._snackBar.open('Login Successfull');
          this.router.navigate(['/user/dashboard']);
          window.location.reload();
        }
      },err=>{
        console.log(err);
        this._snackBar.open('Invalid Credentials');
      })

    }
    else {
      this._snackBar.open('Login Failed');
    }
  }

}
