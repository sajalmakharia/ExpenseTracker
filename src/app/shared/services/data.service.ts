import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class DataService {
  private selectedItem = new BehaviorSubject<object>({});
  private userName = new BehaviorSubject<string>("")
  currentUserName = this.userName.asObservable();
  currentItem = this.selectedItem.asObservable();
  constructor() { }

  changeItem(item: Object){
    this.selectedItem.next(item)
  }

  changeUserName(name: string){
    this.userName.next(name);
  }

}
