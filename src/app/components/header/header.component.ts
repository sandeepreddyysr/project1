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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _storage: StorageService
  ) { }

  ngOnInit(): void {
    console.log(this.router.url);
    if(this._storage.getStorageItem('loggedUser', 'local')) {
  		this.isLoggedIn = true;
  	}
  	else {
  		this.isLoggedIn = false;
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
  }

