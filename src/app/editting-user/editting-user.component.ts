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
  selector: 'app-editting-user',
  templateUrl: './editting-user.component.html',
  styleUrls: ['./editting-user.component.css']
})
export class EdittingUserComponent implements OnInit{

  id: number;
  user: User;
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiservice: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.user = new User();
      this.id = this.route.snapshot.params['id'];
      this.apiservice.getSingleUser(this.id).subscribe((res) => {
        this.editForm.patchValue({
          firstname: res.data[0].firstname,
          lastname: res.data[0].lastname,
          email: res.data[0].email,
          password: res.data[0].password
        })
      });

      this.editForm = this.fb.group({
        firstname: ['', [Validators.required, Validators.minLength(2)]],
        lastname: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      });
    }

    onSubmit() {
      console.log("Data submitted", this.editForm.value);
      this.apiservice.editUser(this.id, this.editForm.value).subscribe((res) => {
        this.user = new User();
        this.gotoList();
      });
    }

    gotoList() {
      this.router.navigate(['/list']);
    }
}
