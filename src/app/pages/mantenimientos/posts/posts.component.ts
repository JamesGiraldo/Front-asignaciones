import { Component, OnInit } from '@angular/core';

import { PostsService } from '../../../services/posts.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Post } from '../../../models/post.model';
import { ModalService } from 'src/app/components/modal/modal.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public cargando: boolean = true;
  public posts: Post[] = [];
  public postsTemporales: Post[] = [];

  public buscarForm = this.fb.group({
    termino: ['', [Validators.required, Validators.minLength(3)]]
  })

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

  constructor(private postsService: PostsService, private busquedasService: BusquedasService, private modalService: ModalService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cargarPosts();
  }

  cargarPosts() {
    this.cargando = true;
    this.postsService.getPosts().subscribe((posts: any) => {
      this.posts = posts;
      this.postsTemporales = posts;
      this.cargando = false;
    })
  }

  EliminarPost(post: Post, id: number) {
    Swal.fire({
      title: 'Estas seguro de eliminar esta publicacion?',
      text: `Estas a punto de elminar la publicacion ${post.title}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#FF311E',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.postsService.DeletePost(post.id).subscribe(() => {
          this.posts.splice(id, 1);
          this.Toast.fire({
            icon: 'success',
            title: `Publicacion eliminada correctamente`
          });
        }, (err) => {
          this.Toast.fire({
            icon: 'error',
            title: ` ${err.error.message} `
          });
          console.log(err);
        });
      }
    })
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarPosts();
    }
    this.busquedasService.buscarUsers('posts', termino).subscribe((resultados: any) => {
      this.posts = resultados;
    })
  }

  cargarModal() {
    this.modalService.abrirModal();
  }
}
