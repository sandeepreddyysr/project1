import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from '../../../../api-service.service';
import { StorageService } from '../../../../storage.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-notifications',
  templateUrl: './create-notifications.component.html',
  styleUrls: ['./create-notifications.component.css']
})
export class CreateNotificationsComponent implements OnInit {

  postForm: FormGroup;
  public Editor = ClassicEditor;
  
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _api: ApiServiceService,
    private _storage: StorageService) { }

  ngOnInit(): void {
  	this.postForm = this.formBuilder.group({
      postTitle: ['', [Validators.required]],
      postDescription: ['', Validators.required]
    });
  }

  post() {


    console.log(JSON.stringify(this.postForm.value.postDescription));

    let params = {
      url: 'login',
      data: {
        title: this.postForm.value.postTitle,
        description: this.postForm.value.postDescription
      }
    }

    this._api.post(params).subscribe(result => {  
        console.log(result);
      },err=>{
        console.log(err);
      })
  }

}
