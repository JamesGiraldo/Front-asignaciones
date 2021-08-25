import { Component, OnInit } from '@angular/core';

import { PostsService } from '../../../services/posts.service';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public cargando: boolean = true;
  public posts: Post[] = [];
  constructor( private postsService: PostsService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando = true;
    this.postsService.getPosts().subscribe( (posts: any)  => {
      this.posts = posts;
      this.cargando = false;
    })
  }
}
