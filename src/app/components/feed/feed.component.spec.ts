import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'
import { posts } from '../../constants/db-testing.constant'

import { CoreService } from '../../services/core/core.service'
import { PostComponent } from '../post/post.component'

import { FeedComponent } from './feed.component'

describe('FeedComponent', () => {
  let component: FeedComponent
  let fixture: ComponentFixture<FeedComponent>
  let el: DebugElement
  let coreService: any
  
  beforeEach(async () => {
    const coreServiceSpy = jasmine.createSpyObj('CoreService', ['getPosts'])
    await TestBed.configureTestingModule({
      declarations: [ 
        FeedComponent,
        PostComponent
      ],
      providers: [
        {provide: CoreService, useValue: coreServiceSpy}
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent)
    component = fixture.componentInstance
    el = fixture.debugElement
    coreService = TestBed.inject(CoreService)
    coreService.getPosts.and.returnValue(of(posts))
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display posts', () => {
    const section = el.query(By.css('section'))
    const posts = section.children.filter(elem => elem.name === 'app-post-card')
    expect(posts).toBeTruthy()
  })

})
