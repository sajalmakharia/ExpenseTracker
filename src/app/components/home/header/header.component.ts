import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { DataService } from '../../../shared/services/data.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {    
    userName: string = "";
    constructor(private authServ: AuthService, public router: Router,private dataServ: DataService) {
    }

    ngOnInit() {
        const x = this.authServ.getUserName();
        x.valueChanges().subscribe(userData => {
          this.userName = userData[1];
        })
        this.dataServ.changeUserName(this.userName);        
    }

    onLoggedout() {
            this.router.navigate(['/login']);
            this.authServ.signOut();
    }

}
