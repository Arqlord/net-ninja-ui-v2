import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../service/user.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  hide = true;

  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private dialogRef: MatDialogRef<AddUserComponent>
  ) {
    this.empForm = this._fb.group({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      username: "",
      id: 1,
    });
  }
  ngOnInit(): void {
    this.empForm = this._fb.group({
      password: ["", [Validators.required, Validators.minLength(8)]],
      firstName: "",
      lastName: "",
      email: "",
      id: 1,
      username: "",
    });

    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  get password() {
    return this.empForm.get('password');
  }



  onFormSubmit() {
    if (this.empForm.valid) {
      console.log(this.empForm.value);
      this._userService.addUser(this.empForm.value).subscribe({
        next: (data: any) => {
          this.dialogRef.close();
          window.location.reload();
          alert("User added successfully");
        },
        error: (error: any) => {
          console.error("There was an error!", error);
        },
      });
    }
  }
}

