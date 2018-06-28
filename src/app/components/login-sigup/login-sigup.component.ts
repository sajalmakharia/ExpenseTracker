import { Component, OnInit, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login-sigup',
  templateUrl: './login-sigup.component.html',
  styleUrls: ['./login-sigup.component.css'],
  providers: [AuthService]
})
export class LoginSigupComponent implements OnInit {

  loginForm: FormGroup;
  newUser = false; // to toggle login or signup form
  passReset = false;
  isNameEmpty = false;
  userName: string = "";
  errStr: boolean = false;
  constructor(private authenticationService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private ngZone: NgZone
  ) {  }
  

  ngOnInit() {
    // reset login status
    this.authenticationService.signOut();

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.resetLoginForm();

  }
  toggleForm() {
    this.newUser = !this.newUser;
  }

  registerUser() {
    if (this.newUser) {
      this.newUser = false;
    } else {
      this.newUser = true;
    }
  }


  displayFieldCss(field: string) {
    if (field !== 'fullName') {
      return {
        'has-danger': !this.loginForm.get(field).valid && this.loginForm.get(field).touched,
        'has-success': this.loginForm.get(field).valid && this.loginForm.get(field).touched
      };
    } else {
      return {
        'has-danger': this.userName === '',
        'has-success': !(this.userName === '')
      };
    }
  }

  onSignUp(): void {
    if (this.userName === '') {
      this.isNameEmpty = true;
      return;
    }
    let details = {};
    if (this.loginForm.valid) {
      details['email'] = this.loginForm.controls['email'].value;
      details['pass'] = this.loginForm.controls['password'].value;
      details['name'] = this.userName;
      this.spinner.show();
      this.authenticationService.emailSignUp(details).then(response => {
        this.router.navigate(['/home']);
        this.checkLoginStatus("Successfully registered")        
      }).catch(error => {
        this.spinner.hide();
        this.toaster.error(error.userError);
      });
    }
  }
  onSignIn(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.controls['email'].value;
      const pass = this.loginForm.controls['password'].value;
      this.spinner.show();
      this.authenticationService.emailLogin(email, pass).then(response => {
        this.ngZone.run(() => this.router.navigateByUrl('/home'));
        this.checkLoginStatus("Successfull Logged In");
      }).catch(error => {
        this.spinner.hide();
        this.errStr = true;
      })

    }
  }
  checkLoginStatus(message){
    
    setTimeout(()=>{
      if(this.authenticationService.authenticated){
        this.ngZone.run(() => this.router.navigateByUrl('/home'));
        this.toaster.success(message);
        this.spinner.hide();
      }  
    },2000)
  }
  removeErr(){
    this.errStr = false;
  }
  changeListner(event) {
    var reader = new FileReader();
    var image = <HTMLImageElement>document.documentElement.querySelector('.image');

    reader.onload = function (e) {
      var src = e.target['result'];
      image['src'] = src;
    };

    reader.readAsDataURL(event.target.files[0]);
  }
  resetLoginForm() {
    this.loginForm.reset();
  }
}
