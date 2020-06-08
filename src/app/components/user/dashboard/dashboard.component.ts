import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../storage.service';
import { Router } from '@angular/router';
import { ApiServiceService } from '../../../api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public userData: any = {
    name: '',
    isAdmin: false
  };
  public postList: any = [];

  constructor(private _storage: StorageService,
    public router: Router,
    public _api: ApiServiceService) { }

  ngOnInit(): void {
    /*this.postList = [{
      id: 1,
      title: "Job opening in hyderabad",
      description: "Your news feed helps you keep up with recent activity on repositories you watch and people you follow.",
      imageURL: "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
      date: '1589948973753'
    },
    {
      id: 2,
      title: "Job opening in Delhi",
      description: "Your news feed helps you keep up with recent activity on repositories you watch and people you follow.",
      imageURL: "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"

    },
    {
      id: 3,
      title: "Job opening in Bangaloure",
      description: "Your news feed helps you keep up with recent activity on repositories you watch and people you follow.",
      imageURL: "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"
    },
    {
      id: 4,
      title: "Job opening in pune",
      description: "Your news feed helps you keep up with recent activity on repositories you watch and people you follow.",
      imageURL: "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"
    },
    {
      id: 5,
      title: "Job opening in USA",
      description: "Your news feed helps you keep up with recent activity on repositories you watch and people you follow.",
      imageURL: "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"
    }]*/
    let data = this._storage.getStorageItem('loggedUser', 'local');
    console.log(data);
    if(data) {
      this.userData.name = data.name;
      this.userData.isAdmin = data.isAdmin;
    }
    this.getNotifications();
  }

  goToNotificationView(post, type) {
    this._storage.setStorageItem('post', post, 'session');
    if(type == 'view')
      this.router.navigateByUrl('/user/notifications/view-notification');
    if(type == 'edit')
      this.router.navigateByUrl('/user/notifications/post-notification/'+post._id);
  }

  getNotifications() {

    const params = { url: 'notifications' };

    this._api.get(params).subscribe(result => {  
      console.log(result);
      this.postList = result;
    },err=>{
      console.log(err);
    })

  }

  delete(data) {

    if(confirm("Are you sure to delete "+ data.title)) {
        const params = { url: 'delete/'+ data._id };

        this._api.delete(params).subscribe(result => {  
          this.getNotifications();
        },err=>{
          console.log(err);
        })

    }
  }

}
