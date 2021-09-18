import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { PasswordUpdate } from '../interfaces/password-update.interface';
import { AuthService } from './auth.service';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor( private http: HttpClient, private authService: AuthService ) { }

  PutPassword( data: PasswordUpdate ){
    return this.http.put(`${base_url}/update-password/${ this.authService.id }`, data, this.authService.headers )
  }
}
