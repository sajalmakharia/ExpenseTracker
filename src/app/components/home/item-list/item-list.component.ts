import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../shared/services/expense.service';
import { Item } from '../../../shared/modal/item.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemComponent } from './../item/item.component';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  itemList: Item[];
  itemsList: any = [];
  selectSortType: string = "default";
  selectSortField: string = "default";
  filterByName: boolean = false;
  filterByImg: boolean = false;
  isItemPresent: boolean = true;
  searchNameKey: string = "";
  radioVal: string = "";
  filterItemPresent: boolean = false;
  constructor(private expenseService: ExpenseService,
    private toaster: ToastrService,
    private modalService: NgbModal,
    private dataServ: DataService) { }

  ngOnInit() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sept", "Oct", "November", "December"
    ];
    const x = this.expenseService.getData();
    x.snapshotChanges().subscribe(item => {
      this.itemList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        const date = new Date(y['created_at']);
        const stringDate = date.getDate() + " " + monthNames[date.getMonth()]+ " "+ date.getFullYear();
        y['date'] = stringDate;
        this.itemList.push(y as Item);
      });
      this.itemsList = this.itemList;
      if (this.itemList.length === 0) {
        this.modalService.open(ItemComponent);
        this.isItemPresent = false;
      } else {
        this.isItemPresent = true;
      }
    });
  }

  onEdit(item) {
    this.dataServ.changeItem(item);
    this.modalService.open(ItemComponent);
  }
  onDelete(item) {
    if (this.itemList.length === 0) {
      this.isItemPresent = false;
    }
    if (confirm('Are you sure you want to delete the item ?') === true) {
      this.expenseService.deleteItem(item.$key, item.name);
      this.toaster.warning('Deleted Successfully', 'Item Deleted');
    }
  }
  // to add new Item
  addItem() {
    this.modalService.open(ItemComponent);
  }

  // For sorting based on date or Price
  onSort() {
    if (this.selectSortField === "default" || this.selectSortType === "default") {
      this.toaster.error("Please the field names and the type of sorting")
      return;
    }
    if (this.selectSortField === "price") {
      if (this.selectSortType === "ascend") {
        this.itemsList.sort((a, b) => {
          return a.price - b.price;
        })
      } else {
        this.itemsList.sort((a, b) => {
          return b.price - a.price;
        })
      }
    } else if (this.selectSortField === "createdDate") {
      if (this.selectSortType === "ascend") {
        this.itemsList.sort((a, b) => {
          return a.created_at - b.created_at;
        });
      } else {
        this.itemsList.sort((a, b) => {
          return b.created_at - a.created_at;
        });
      }
    }
  }

  nameInputValidation() {
    return {
      'has-danger': this.searchNameKey === "" && this.filterByName,
      'has-success': this.searchNameKey !== "" && this.filterByName
    };
  }

  filterNames() {
    this.filterByName = !this.filterByName;
    if (!this.filterByName) {
      this.itemsList = this.itemList;
    }
  }
  filterImages() {
    this.filterByImg = !this.filterByImg;
    if (!this.filterByImg) {
      this.itemsList = this.itemList;
    }
  }
  filterImg(event) {
    this.radioVal = event.currentTarget.value;
    this.onFilter();

  }
  // Filter based on name or/and imageUrl
  onFilter() {
    if (!this.filterByImg && !this.filterByName) {
      this.toaster.error("Please the field on which filter needs to be done");
      return
    }
    if (this.filterByName && this.searchNameKey === "") {
      this.toaster.error("Please enter some text");
      return
    }
    if (this.filterByImg && this.radioVal === "") {
      this.toaster.error("Please select an image option");
      return
    }
    if(this.filterByName && this.searchNameKey.length<3){
      this.toaster.error("Please Enter atleast 3 characters to begin filter");
      return
    }
    this.itemsList = this.itemList;
    if (this.filterByName && this.filterByImg) {
      if (this.radioVal === "imgOnly") {
        this.itemsList = this.itemList.filter(val => {
          return ((val.name.indexOf(this.searchNameKey) !== -1) && val.imageUrl !== "");
        });
      } else {
        this.itemsList = this.itemList.filter(val => {
          return ((val.name.indexOf(this.searchNameKey) !== -1) && val.imageUrl === "");
        });
      }
    } else if (this.filterByName) {
      this.itemsList = this.itemList.filter(val => {
        return (val.name.indexOf(this.searchNameKey) !== -1);
      });
    } else {
      if (this.radioVal === "imgOnly") {
        this.itemsList = this.itemList.filter(val => {
          return (val.imageUrl !== "");
        });
      } else {
        this.itemsList = this.itemList.filter(val => {
          return (val.imageUrl === "");
        });
      }
    }
    if( this.itemsList.length === 0){
      this.filterItemPresent = false;
    }
  }
}
