import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{

  users: any;
  constructor(
    private apiservice: ApiService, 
    private router: Router
    ) {}
  ngOnInit(): void {
      this.getAllUsers();
  }

  getAllUsers(){
    this.apiservice.getAllData().subscribe((res) => {
      this.users = res.data;
    });
  }

  toeditUser(id: number){
    this.router.navigate(['edit', id]);
  }

  removeUser(id: number){
    this.apiservice.deleteUser(id).subscribe((res) => {
      this.getAllUsers();
    });

    console.log("data removed");
  }

  gotoForm(){
    this.router.navigate(['/form']);
  }
}
