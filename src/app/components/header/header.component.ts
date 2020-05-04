import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authService: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.router.url);
  }

  goToLogin() {
    this.router.navigate(['/authentication/login'])
  }
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  }

