import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

export class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit{
  
  errormsg:any;
  succesmsg:any;
  user: User = new User();
  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiservice: ApiService,
    private actrouter: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
      this.userForm = this.fb.group({
        firstname: ['', [Validators.required, Validators.minLength(2)]],
        lastname: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]

      });
  }

  onSubmit() {
    console.log('Form submitted', this.userForm.value);
    if (!this.userForm.valid) {
      return;
    }
    if(this.userForm.valid){
      this.apiservice.createNewUser(this.userForm.value).subscribe((res) => {
        console.log(res, 'data submitted');
        this.userForm.reset();
        this.succesmsg = res.message;
      })
    } else {
      this.errormsg = "All field required"
    }
  }

  goToPage(pageName:string) {
    this.router.navigate([`${pageName}`]);
  }
  
}
