import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from '../../../../api-service.service';
import { StorageService } from '../../../../storage.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { environment } from '../../../../../environments/environment';

const API_URL = environment.API;

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
      "id": 'iosTeam',
      "name": "IOS Team"
    },
    {
      "id": 'devopsTeam',
      "name": "DevOps Team"
    },
    {
      "id": 'testingTeam',
      "name": "Testing Team"
    },
    {
      "id": 'javaTeam',
      "name": "Java Team"
    },
    {
      "id": 'all',
      "name": "All"
    },
  ];
  public SERVER_URL = "";
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
  public token: any;
  public notificationData: any = {
    title: '',
    description: '',
    date: '',
    id: '',
    link: '',
    tags: ''
  };
  public id: any;
  public editMode: boolean;
  
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _api: ApiServiceService,
    private _storage: StorageService,
    private _httpClient: HttpClient) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.editMode = true;
    }

    let postData = this._storage.getStorageItem('post', 'session');

    if(postData && postData._id == this.id) {
      this.notificationData.title = postData.title
      this.notificationData.description = postData.description
      this.notificationData.date = postData.date
      this.notificationData.id = postData._id
      this.notificationData.tags = postData.tag
    }

  	this.postForm = this.formBuilder.group({
      postTitle: [this.notificationData.title, [Validators.required]],
      postDescription: [this.notificationData.description, Validators.required],
      postImage: [''],
      tags: [this.notificationData.tags],
      link: [this.notificationData.link],
      date: [this.notificationData.date]
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

    let data = this._storage.getStorageItem('loggedUser', 'local');

    this.token = data.token;

    

    const formData = new FormData();
    formData.append('image', this.postForm.get('postImage').value);
    formData.append('title', this.postForm.value.postTitle);
    formData.append('description', this.postForm.value.postDescription);
    formData.append('scheduledDate', this.postForm.value.date);
    formData.append('isScheduled', dateEntered);
    formData.append('link', this.postForm.value.link);

    if(!this.editMode) {
      const httpOptions = {
        headers: new HttpHeaders({
          'authorization': "Bearer " + this.token
        })
      };
      this.SERVER_URL = API_URL + 'create';
      this._httpClient.post<any>(this.SERVER_URL, formData, httpOptions).subscribe(
        (res) => this.router.navigate(['/user/dashboard']),
        (err) => console.log(err)
      );
    }
    if(this.editMode) {
      const httpOptions = {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'authorization': "Bearer " + this.token
        })
      };
      let paramsData = {
        title: this.postForm.value.postTitle,
        description : this.postForm.value.postDescription,
        link: this.postForm.value.link
      }
      this.SERVER_URL = API_URL + 'update' + '/' + this.id;
      this._httpClient.put<any>(this.SERVER_URL, paramsData).subscribe(
        (res) => this.router.navigate(['/user/dashboard']),
        (err) => console.log(err)
      ); 
    }

  }

   onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.postForm.get('postImage').setValue(file);
    }
  }

}
