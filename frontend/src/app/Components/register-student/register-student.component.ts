import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/user.service';
import { ToastService } from 'src/app/Services/toast/toast.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent implements OnInit {
  form!: FormGroup;
  hide = true;
  hideMsg = true;
  msg = '';
  faEye=faEye ;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nom: ['', Validators.required,Validators.minLength(3)],
      prenom: ['', Validators.required,Validators.minLength(3)],
      mdp: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      regle: ['', Validators.requiredTrue],
      sex: ['', Validators.required],
      dateNaissance: ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  signIn() {
    
      
      const formData = this.form.value;
      this.userService.registerstudent(formData).subscribe(
        data => {
          alert("succed!");
          this.router.navigate(['/home/login']);
          this.msg = 'Registered Successfully!';
          this.form.reset();
          this.toast.SuccessToast('A verification link was sent to your email');
          this.hideMsg = false;
          return data ;
        },
        (error) => {
          this.toast.ErrorToast(error.error.Message);
          console.log(error);
        }
      );
   
  }
}
