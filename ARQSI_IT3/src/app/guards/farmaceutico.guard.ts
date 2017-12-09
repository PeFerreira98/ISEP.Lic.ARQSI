import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class FarmaceuticoGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }


    canActivate() {
        console.log(this.authenticationService.userInfo);
        
        if (this.authenticationService.userInfo)
            if (this.authenticationService.userInfo.farmaceutico)
                return true;

        this.router.navigate(['/login', { u: 'no' }]);
        return false;
    }
}