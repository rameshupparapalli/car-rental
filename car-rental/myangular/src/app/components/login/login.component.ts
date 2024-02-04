import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup;

  constructor(private fb:FormBuilder,private router:Router,private userservice:UserServiceService,private user:UserServiceService,private userStore:UserServiceService,private toast:NgToastService)
    {
      
    }

    ngOnInit():void{
      this.loginForm=this.fb.group({
        email:['',Validators.required],
        password:['',Validators.required]
      })
      
      }
      onSubmit()
      {
        if(this.loginForm.valid)
        {
          console.log(this.loginForm.value);
          this.userservice.login(this.loginForm.value)
          .subscribe({
            next:(res) => {
             // alert(res.message);
             this.loginForm.reset();
             this.user.storeToken(res.token);
             const tokenPayLoad = this.user.decodedToken();
             this.userStore.setFullEmailForStore(tokenPayLoad.name);
             this.userStore.setRoleForStore(tokenPayLoad.role);
             this.toast.success({detail:"Success",summary:res.message,duration:5000});
              if(tokenPayLoad.role == 'admin')
              {
                this.router.navigate(['admin']);

              }
              else{
                this.router.navigate(['user']);
              }
            
              
      
            },
            error:(err) =>{
            //  alert(err?.error.message)
            this.toast.error({detail:"Error",summary:"User not Found",duration:5000});

              
            }
          })
          //send data to db
        }
        else{
          //error
       
          this.validateAllFormFields(this.loginForm);
          this.toast.warning({detail:"Error",summary:"Please enter Values",duration:5000});
        }
      }

      private validateAllFormFields(formGroup:FormGroup)
{
Object.keys(formGroup.controls).forEach(field =>{
  const control =formGroup.get(field);
  if(control instanceof FormControl){
    control.markAsDirty({onlySelf:true});
  }
  else if(control instanceof FormGroup)
  {
    this.validateAllFormFields(control)
  }
})
}


}
