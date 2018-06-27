import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Item } from '../modal/item.model';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';
import {ToastrService} from 'ngx-toastr';
@Injectable()
export class ExpenseService {
  public itemList: AngularFireList<any>;
  public selectedItem: any = new Item();
  private imageUrl: string = '';
  private basePath = '/items';
  constructor(private firebase: AngularFireDatabase, private authService: AuthService, private toaster: ToastrService) { }

  getData() {
    const userId = this.authService.currentUserId;

    this.itemList = this.firebase.list(`${this.basePath}/${userId}`);
    return this.itemList;
  }

  getSelectedData(){
    return this.selectedItem;
  }

  setSelectedData(data){
    this.selectedItem = Object.assign({}, data);
  }

  insertItem(item) {
    const userId = this.authService.currentUserId;
    return new Promise((resolve, reject) => {        
      this.firebase.list(`${this.basePath}/${userId}`).push({
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        created_at: item.created_at
      });
      resolve("success");
    })
  }

  updateItem(item) {
    const userId = this.authService.currentUserId;
    return new Promise((resolve, reject) => {
      this.firebase.list(`${this.basePath}/${userId}`).update(item.$key, {
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl
    });
    resolve("success");
  })
  }

  deleteItem($key,name) {
    this.itemList.remove($key);
    this.deleteFileStorage(name);
  }

  // to upload the file to fireStorage
  uploadImage(image, item, operation){
    const userId = this.authService.currentUserId;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${userId}/${item.name}`).put(image);
    return new Promise((resolve, reject) => {
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        null,
        (error) => {
          // fail
          this.toaster.error("Image Upload has failed saving data without Image");
          item.imageUrl = '';
          if(operation === 'update'){
            this.updateItem(item).then(()=>{
              resolve("success");
            });
          } else {
            this.insertItem(item).then(()=>{
              resolve("success");
            });
            
          }
        },
        () => {
          // success
          item.imageUrl = uploadTask.snapshot.downloadURL
          if(operation === 'update'){
            this.updateItem(item).then(()=>{
              resolve("success");
            });
          } else {
            this.insertItem(item).then(()=>{
              resolve("success");
            });
          }
          
        }
      );
    });
  }
  // to delete Image from storage
  private deleteFileStorage(name:string) {
    const userId = this.authService.currentUserId;
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${userId}/${name}`).delete()
  }


}
