import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { CoreService } from '../../services/core/core.service';

@Component({
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  posts: Post[] = null

  constructor(private core: CoreService, private router: Router) { }

  ngOnInit(): void {
    this.core.getPosts().subscribe(
      (posts) => {
        this.posts = posts
      }
    )
  }

  onShowCard(id: number): void {
    this.router.navigate(['/posts', id])
  }
}
