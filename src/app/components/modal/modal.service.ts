import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _ocultar: boolean = true;

  constructor() { }

  get ocultarModal(){
    return this._ocultar;
  }

  abrirModal(){
    this._ocultar = false;
  }

  cerrarModal(){
    this._ocultar = true;
  }

}
