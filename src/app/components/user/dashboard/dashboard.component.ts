import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../storage.service';
import { Router } from '@angular/router';

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
    public router: Router) { }

  ngOnInit(): void {
    this.postList = [{
      id: 1,
      postTitle: "Job opening in hyderabad",
      postDescription: "Your news feed helps you keep up with recent activity on repositories you watch and people you follow."
    },
    {
      id: 2,
      postTitle: "Job opening in Delhi",
      postDescription: "Your news feed helps you keep up with recent activity on repositories you watch and people you follow."
    },
    {
      id: 3,
      postTitle: "Job opening in Bangaloure",
      postDescription: "Your news feed helps you keep up with recent activity on repositories you watch and people you follow."
    },
    {
      id: 4,
      postTitle: "Job opening in pune",
      postDescription: "Your news feed helps you keep up with recent activity on repositories you watch and people you follow."
    },
    {
      id: 5,
      postTitle: "Job opening in USA",
      postDescription: "Your news feed helps you keep up with recent activity on repositories you watch and people you follow."
    }]
    let data = this._storage.getStorageItem('loggedUser', 'local');
    console.log(data);
    if(data) {
      this.userData.name = data.name;
      this.userData.isAdmin = data.isAdmin;
    }
  }

  goToNotificationView() {
    this.router.navigateByUrl('/user/notifications/view-notification');
  }

}
