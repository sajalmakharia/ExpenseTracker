import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from '../../../shared/services/expense.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Item } from '../../../shared/modal/item.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [ExpenseService]
})
export class ItemComponent implements OnInit {
  selectedFile: FileList;
  currentFile: Item;
  itemForm: FormGroup;
  imageUrl: string = 'assets/splash.jpg';
  constructor(private expenseService: ExpenseService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private activeModal: NgbActiveModal,
    private dataServ: DataService) { }

  // to the get the form reference
  selectedItem: any;

  ngOnInit() {

    this.itemForm = this.formBuilder.group({
      itemName: ['', Validators.compose([Validators.required])],
      itemPrice: ['', Validators.compose([Validators.required])],
      $key: [''],
      itemImage: ['']
    });
    this.dataServ.currentItem.subscribe(state => this.selectedItem = state);
    if (Object.keys(this.selectedItem).length !== 0) {
      this.itemForm.get('$key').setValue(this.selectedItem.$key);
      this.itemForm.get('itemName').setValue(this.selectedItem.name);
      this.itemForm.get('itemPrice').setValue(this.selectedItem.price);
      this.imageUrl = this.selectedItem.imageUrl;
    } else {
      this.resetForm();
    }
    this.dataServ.changeItem({});
  }

  // to detect the image file
  detectFiles(event) {
    const selectedFile = event.target.files;
    this.selectedFile = selectedFile.item(0);
    //  this.currentFile = new Item(this.selectedFile);
  }
  onSubmit() {
    const itemForm = {}
    this.spinner.show();
    if (this.itemForm.valid) {
      itemForm['$key'] = this.itemForm.get('$key').value
      itemForm['created_at'] = new Date().getTime();
      itemForm['name'] = this.itemForm.get('itemName').value;
      itemForm['price'] = this.itemForm.get('itemPrice').value;

      if (this.itemForm.get('$key').value === null || this.itemForm.get('$key').value === '') {
        if (this.itemForm.get('itemImage').value === '' || this.itemForm.get('itemImage').value === null) {
          itemForm['imageUrl'] = '';
          this.expenseService.insertItem(itemForm).then((resp)=>{
            this.toaster.success('Submitted Successfully', 'Item Added');
            this.spinner.hide();
            this.activeModal.close();
          });
        } else {
          this.expenseService.uploadImage(this.selectedFile, itemForm, 'insert').then((resp)=>{
            this.toaster.success('Submitted Successfully', 'Item Added');
            this.spinner.hide();
            this.activeModal.close();
          });
        }

      } else {
        if (this.itemForm.get('itemImage').value === '') {
          itemForm['imageUrl'] = this.imageUrl;
          this.expenseService.updateItem(itemForm).then((resp)=>{
            this.toaster.success('Updated Successfully', 'Item Updated');
            this.spinner.hide();
            this.activeModal.close();
          });
        } else{
          this.expenseService.uploadImage(this.selectedFile, itemForm, 'update').then((resp)=>{
            this.toaster.success('Updated Successfully', 'Item Updated');
            this.spinner.hide();
            this.activeModal.close();
          });
        }
        
        this.toaster.success('Submitted Successfully', 'Item Updates');
      }
      this.resetForm();
    }
  }

  resetForm() {
    this.itemForm.reset();
  }

}
