import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private authService: AuthService) { }


  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/sign-up`, formData).pipe(
      tap((resp) => {
        this.authService.guardarLocalStorage(resp['token']);
      })
    );
  }

}
