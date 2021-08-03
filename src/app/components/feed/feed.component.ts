import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trimStart } from 'cypress/types/lodash';
import { Post } from 'src/app/models/post.model';
import { CoreService } from 'src/app/services/core/core.service';

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
