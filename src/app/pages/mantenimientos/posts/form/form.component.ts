import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/components/modal/modal.service';
import { Post } from 'src/app/models/post.model';
import { CursosService } from 'src/app/services/cursos.service';
import { PostsService } from 'src/app/services/posts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormPostsComponent implements OnInit {

  public formSubmitted: boolean = false;
  public post: Post;

  public Formulario = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    cuerpo: ['', Validators.required],
  });

  public Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  constructor( private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder, public modalService: ModalService, private postService: PostsService ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.cargarPost( id );
    }
  }

  cargarPost(id: string) {
    this.postService.ShowPost( id ).subscribe((resp: Post) => {
      this.post = resp;
      this.Formulario.patchValue( resp );
      this.post.id = parseInt(id);
    });
  }

  save(){
    this.formSubmitted = true;
    // console.log(this.Formulario.value);
    if (this.Formulario.invalid) return;

    let peticion: Observable<any>;

    if (this.post) {
      peticion = this.postService.PutPost( this.post.id, this.Formulario.value );
    } else {
      peticion = this.postService.NewPost( this.Formulario.value );
    }
    peticion.subscribe(resp => {
      this.Toast.fire({
        icon: 'success',
        title: `Publicacion guardada exitosamente!`
      });
      this.router.navigateByUrl(`/dashboard/post/${ resp.id }`);
    }, (err) => {
      console.log(err);
      this.Toast.fire({
        icon: 'error',
        title: `Problemas en la peticion, intente nuevamente!`
      });
    })
  }

  campoValido(campo: string): boolean {
    if (this.Formulario.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }

}
