import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/user.service';
import { ToastService } from 'src/app/Services/toast/toast.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formregister!: FormGroup;
  msg = '';
  submitted = false;
  hideMsg = true;
  faEye=faEye;
  hide = true;
  profileImage: File;

  constructor(
    private formBuilder: FormBuilder,
    private userservice: UserService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.form();
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  form() {
    this.formregister = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      titre: ['', [Validators.required]],
      dateNaissance: ['', Validators.required],
      category: ['', Validators.required],
      university: ['', Validators.required],
      mdp: ['', Validators.required],
      activities: ['', Validators.required],
      regle: ['', Validators.requiredTrue]
      //image: [null]
    });
  }

  get f() {
    return this.formregister.controls;
  }
image :any ; 
  onImageSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.image = event.target.files[0];
      console.log(this.image);
    }
  }

  Register() {
    const formData = this.formregister.value;
  
    this.userservice.signupClub(formData).subscribe(
      (data) => {
        alert("registration succed waiting for confirmation from studenty  admin");
        this.msg = 'Registered successfully. Waiting for studenty admin to confirm your identity';
        this.toast.SuccessToast('Identity sent to admin. Waiting for approval.');
        this.formregister.reset();
        this.router.navigate(['/home/login']);
        return data;
      },
      (error) => {
        this.toast.ErrorToast(error.error.Message);
        console.log(error);
      }
    );
  }
}
