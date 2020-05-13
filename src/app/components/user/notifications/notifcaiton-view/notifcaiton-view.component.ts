import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../../storage.service';

@Component({
  selector: 'app-notifcaiton-view',
  templateUrl: './notifcaiton-view.component.html',
  styleUrls: ['./notifcaiton-view.component.css']
})
export class NotifcaitonViewComponent implements OnInit {

  public post: any ;
  
  constructor(private _storage: StorageService,) { }

  ngOnInit(): void {
  	this.post = this._storage.getStorageItem('post', 'session');
  }

}
