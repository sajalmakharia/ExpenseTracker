import { LoginSigupModule } from './login-sigup.module';

describe('LoginSigupModule', () => {
    let loginSigupModule: LoginSigupModule;

    beforeEach(() => {
        loginSigupModule = new LoginSigupModule();
    });

    it('should create an instance', () => {
        expect(loginSigupModule).toBeTruthy();
    });
});

