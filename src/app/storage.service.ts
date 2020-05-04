import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getStorageItem(keyName: string, type: string) {

  	let getData;

  	if(type == 'local') 
  		getData = localStorage.getItem(keyName);
  	else if(type == 'session')
  		getData = sessionStorage.getItem(keyName);
  	else 
  		return false;

  	return JSON.parse(getData);

  }

  setStorageItem(keyName: string, data, type: string) {

  	let setData;
  	data = JSON.stringify(data);

  	if(type == 'local') {
  		localStorage.setItem(keyName, data);
  		return true
  	}
  	else if(type == 'session') {
  		sessionStorage.setItem(keyName, data);
  		return true
  	}
  	else {
  		return false
  	}

  }

  removeStorageItem(keyName: string, type: string) {
  	if(type == 'local') {
  		localStorage.removeItem(keyName);
  		return true
  	}
  	else if(type == 'session') {
  		sessionStorage.removeItem(keyName);
  		return true
  	}
  	else {
  		return false
  	}
  }

  removeAllStorageItems(type: string) {
  	if(type == 'all') {
	  	localStorage.clear();
	  	sessionStorage.clear();
	}
	else {
		type == 'session' ? sessionStorage.clear() : localStorage.clear()
	}

  }

}
