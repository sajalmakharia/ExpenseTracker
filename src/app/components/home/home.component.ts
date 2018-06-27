import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../shared/services/expense.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ExpenseService]
})
export class HomeComponent implements OnInit {

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
  }

}
