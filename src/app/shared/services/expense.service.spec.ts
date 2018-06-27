import { TestBed, inject } from '@angular/core/testing';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ExpenseService } from './expense.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
describe('ExpenseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),],
      providers: [ExpenseService, AuthService]
    });
  });

  it('should be created', inject([ExpenseService], (service: ExpenseService) => {
    expect(service).toBeTruthy();
  }));
});
