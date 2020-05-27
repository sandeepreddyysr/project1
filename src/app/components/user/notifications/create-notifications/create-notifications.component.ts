import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from '../../../../api-service.service';
import { StorageService } from '../../../../storage.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-create-notifications',
  templateUrl: './create-notifications.component.html',
  styleUrls: ['./create-notifications.component.css']
})
export class CreateNotificationsComponent implements OnInit {

  @ViewChild('picker') picker: any;

  postForm: FormGroup;
  public Editor = ClassicEditor;
  public tagsList: any = [
    {
      "id": 1,
      "name": "All"
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
  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public tagsListData: any;
  
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
      postImage: [''],
      tags: [''],
      date: ['']
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

    let dateEntered;

    if(this.postForm.value.date) {
      this.postForm.value.date = moment(this.postForm.value.date).format();
      dateEntered = true;
    }
    else {
      dateEntered = false;
    }

    if(this.postForm.value.tags) {
      this.tagsListData = this.postForm.value.tags.join(',');
      console.log(this.tagsListData);
    }

    const formData = new FormData();
    formData.append('image', this.postForm.get('postImage').value);
    formData.append('title', this.postForm.value.postTitle);
    formData.append('description', this.postForm.value.postDescription);
    formData.append('scheduledDate', this.postForm.value.date);
    formData.append('isScheduled', dateEntered);
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
