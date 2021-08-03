import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { posts } from '../constants/db-testing.constant';
import { CoreService } from './core/core.service';

import { PostResolver } from './post.resolver';

describe('PostResolver', () => {
  let resolver: PostResolver;
  let coreService: any

  beforeEach(() => {
    const coreServiceSpy = jasmine.createSpyObj('CoreService', ['getPostData'])
    TestBed.configureTestingModule({
      providers: [
        PostResolver,
        {provide: CoreService, useValue: coreServiceSpy}
      ],
      imports: [
        RouterTestingModule
      ]
    });
    resolver = TestBed.inject(PostResolver);
    coreService = TestBed.inject(CoreService)
    coreService.getPostData.and.returnValue(of(posts[0]))
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
