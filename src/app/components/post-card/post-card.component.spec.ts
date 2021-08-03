import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { posts } from 'src/app/constants/db-testing.constant'
import { PostCardComponent } from './post-card.component'

describe('PostCardComponent', () => {
  let component: PostCardComponent
  let fixture: ComponentFixture<PostCardComponent>
  let el: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCardComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCardComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should display the post', () => {
    component.post = posts[0]
    const post = el.query(By.css('.card'))
    expect(post).toBeTruthy()
    const title = post.query(By.css('.title'))
    expect(title).toBeTruthy()
  })
})
