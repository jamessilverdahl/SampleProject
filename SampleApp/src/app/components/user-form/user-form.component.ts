import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
    standalone: true,
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  imports: [ HttpClientModule, ReactiveFormsModule ]
})
export class UserFormComponent {
  userForm: FormGroup;
  @Output() usercreated = new EventEmitter<string>();
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.generateForm();
  }

  onSubmit() {
    if (this.userForm.valid) {
        this.userService.add(this.userForm.getRawValue()).subscribe(response=>{
            this.userForm = this.generateForm(); // Clear the form
            this.usercreated.emit(response);
        },(error) => {
            console.error('Error saving user:', error);
          })
    }
  }
  generateForm(){
    return this.fb.group({
        name: ['', Validators.required],
        address: ['']
      });
  }
}
