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
    
    if(this.loginForm.value.email === 'admin@domain.com' && this.loginForm.value.password === 'admin@123') {

      const params = { url: 'api/login', data: {email: 'eve.holt@reqres.in', password: 'cityslicka'}};

      this._api.post(params).subscribe(result => {  
        console.log(result);
        let storage = this._storage.setStorageItem('loggedUser', result, 'local');
        if(storage) {
           this.router.navigate(['/user/dashboard']);
        }
      },err=>{
        console.log(err);
      })

    }
    else {
      this._snackBar.open('Login Failed');
    }
  }

}
