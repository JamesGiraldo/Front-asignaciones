import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public cargando: boolean = true;
  public post: Post = { id: 0, title: '', cuerpo: '' };

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

  constructor(private router: Router, private postService: PostsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarCurso(id));
  }

  cargarCurso(id: string) {
    this.cargando = true;
    this.postService.ShowPost( id ).subscribe(resp => {
      this.post = resp;
      this.cargando = false;
    });
  }

  DestroyPost(id: number) {
    Swal.fire({
      title: 'Estas seguro de eliminar esta publicacion?',
      text: `Estas a punto de elminar el curso ${this.post.title}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#FF311E',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.postService.DeletePost(id).subscribe(() => {
          this.Toast.fire({
            icon: 'success',
            title: `Curso eliminado correctamente`
          });
          this.router.navigateByUrl(`/dashboard/posts`);
        }, (err) => {
          this.Toast.fire({
            icon: 'error',
            title: ` ${err} `
          });
          console.log(err);
        });
      }
    })
  }

}
