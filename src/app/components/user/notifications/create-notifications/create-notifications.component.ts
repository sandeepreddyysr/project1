import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from '../../../../api-service.service';
import { StorageService } from '../../../../storage.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-notifications',
  templateUrl: './create-notifications.component.html',
  styleUrls: ['./create-notifications.component.css']
})
export class CreateNotificationsComponent implements OnInit {

  postForm: FormGroup;
  public Editor = ClassicEditor;
  public tagsList: any = [
    {
      "id": 1,
      "name": "Java Script Team"
    },
    {
      "id": 2,
      "name": "Java Team"
    },
    {
      "id": 3,
      "name": "Android Team"
    }
  ];
  public SERVER_URL = "http://localhost:8080/create";
  
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _api: ApiServiceService,
    private _storage: StorageService,
    private _httpClient: HttpClient) { }

  ngOnInit(): void {
  	this.postForm = this.formBuilder.group({
      postTitle: ['', [Validators.required]],
      postDescription: ['', Validators.required],
      postImage: ['', Validators.required],
      tags: ['', Validators.required]
    });
  }

  post() {

    /*console.log(JSON.stringify(this.postForm.value.postDescription));

    let params = {
      url: 'create',
      data: {
        title: this.postForm.value.postTitle,
        description: this.postForm.value.postDescription
      }
    };

    this._api.post(params).subscribe(result => {  
      console.log(result);
      this.router.navigate(['/user/dashboard']);
    },err=>{
      console.log(err);
      this._snackBar.open('Failed To Post. Try Again');
    })*/

    const formData = new FormData();
    formData.append('image', this.postForm.get('postImage').value);
    formData.append('title', this.postForm.value.postTitle);
    formData.append('description', this.postForm.value.postDescription);
    this._httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => this.router.navigate(['/user/dashboard']),
      (err) => console.log(err)
    );

  }

   onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.postForm.get('postImage').setValue(file);
    }
  }

}
