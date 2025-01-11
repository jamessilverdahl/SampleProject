import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { user } from '../models/user.model';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, UserFormComponent, UserListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [UserService]
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
this.loadUsers();
  }
  title = 'SampleAngularApp';
  users: any[] = [];
  constructor(private userService: UserService)
  {
    
  }
  OnUserCreate()
  {
    this.loadUsers();
  }
  loadUsers(): void {
    this.userService.getAll().subscribe(
      (data: user[]) => {
        this.users = data;
      },
      (error: string) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
