import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public _user: UserService,
    public _fb: FormBuilder
  ) { }

  step: boolean = false;
  cities = ["Tel Aviv", "Jerusalem", "Haifa", "Raanana", "Ramat Gan", "Herzilha", "Kfar Saba", "Ramat Aviv", "Beer Sheva", "Eilat"];
  error = "";
  useridverifield = [];
  emailverifield = [];
  hide = true;

  form: FormGroup = this._fb.group({
    userID: ["", [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    passwordConfirm: ["", Validators.required],
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    city: ["", Validators.required],
    street: ["", Validators.required]
  })


  ngOnInit(): void {
    this._user.getAllUsersInfo()
  }


  public next(): void {
    if (this.form.value.userID && this.form.value.email && this.form.value.password && this.form.value.passwordConfirm) {
      if (this.form.value.userID > 9) {
        this.useridverifield = this._user.allinfoArr.filter(id => id.userID == this.form.value.userID)
        // console.log(this.useridverifield);
        if (this.useridverifield.length == 0) {
          this.emailverifield = this._user.allinfoArr.filter(e => e.email == this.form.value.email)
          // console.log(this.emailverifield);
          if (this.emailverifield.length == 0) {
            if (this.form.value.password == this.form.value.passwordConfirm) {
              this.step = true;
            } else {
              this.error = "Passwords dont match, try again"
            }
          } else {
            this.error = "Email is already in used"
          }
        } else {
          this.error = "ID already registered";
        }
      } else {
        console.log("ID length must be 9");
        this.error = "ID length must be 9";
      }
    } else {
      console.log("All filed are required");
    }

  }
}
