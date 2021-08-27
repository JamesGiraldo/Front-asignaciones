import { Component, OnInit } from '@angular/core';

import { PostsService } from '../../../services/posts.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public cargando: boolean = true;
  public posts: Post[] = [];
  public postsTemporales: Post[] = [];

  constructor( private postsService: PostsService, private busquedasService: BusquedasService ) { }

  ngOnInit(): void {
    this.cargarPosts();
  }

  cargarPosts(){
    this.cargando = true;
    this.postsService.getPosts().subscribe( (posts: any)  => {
      this.posts = posts;
      this.postsTemporales = posts;
      this.cargando = false;
    })
  }

  buscar( termino: string ){
    if ( termino.length === 0 ){
      return this.cargarPosts();
    }
    this.busquedasService.buscarUsers( 'posts', termino ).subscribe( (resultados: any) => {
      this.posts = resultados;
    })
  }
}
