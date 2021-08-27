import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { delay } from 'rxjs/operators';

import { AuthService } from './auth.service';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getRoles() {
    return this.http.get(`${base_url}/roles`, this.authService.headers).pipe(
      delay(100)
    );
  }

}
