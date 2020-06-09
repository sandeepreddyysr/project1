import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authService: any;
  isLoggedIn: boolean;
  userData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _storage: StorageService
  ) { }

    ngOnInit(): void {
      console.log(this.router.url);
      if(this._storage.getStorageItem('loggedUser', 'local')) {
        this.userData = this._storage.getStorageItem('loggedUser', 'local');
        console.log(this.userData);
    		this.isLoggedIn = true;
    	}
    	else {
    		this.isLoggedIn = false;
    	}
    }

    goTo() {
      if(this._storage.getStorageItem('loggedUser', 'local')) {
       this.router.navigate(['/user/dashboard']) 
      }
      else {
        this.router.navigate(['/authentication/login'])
      }
    }

    goToLogin() {
      this.router.navigate(['/authentication/login'])
    }
    
    logout(){
      this._storage.removeAllStorageItems('all');
      this.router.navigateByUrl('/authentication/login');
      window.location.reload();
    }

    postNotification() {
        this.router.navigateByUrl('/user/notifications/post-notification');
    }

    goToSchedules() {
      this.router.navigate(['/user/scheduled-notifications']);
    }

    goToContact() {
      this.router.navigate(['/user/contact-us']);
    }
  }

