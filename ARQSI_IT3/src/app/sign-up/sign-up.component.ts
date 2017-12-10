import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SignUpService } from '../sign-up.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private signupservice: SignUpService
  ) { }

  ngOnInit() {
  }

  signup(){
    this.loading = true;
    this.signupservice.signUp(this.model.name, this.model.email, this.model.password)
      .subscribe(result => {
        this.loading = false;
        if (result === true) {
          this.router.navigate(['/']);
        } else {
          this.error = 'Error Ocurred';
        }
      });
  }

}
