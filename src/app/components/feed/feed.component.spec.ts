import { DebugElement } from '@angular/core'
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { PostCardComponent } from 'components/post-card/post-card.component'
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
    const coreServiceSpy = jasmine.createSpyObj('CoreService', ['getPosts', 'asyncSubtract'])
    await TestBed.configureTestingModule({
      declarations: [FeedComponent, PostCardComponent],
      providers: [
        { provide: CoreService, useValue: coreServiceSpy },
        /* provideMockStore({ initialState }) */
      ],
      imports: [RouterTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent)
    component = fixture.debugElement.componentInstance
    el = fixture.debugElement
    coreService = fixture.debugElement.injector.get(CoreService)
    coreService.asyncSubtract.and.returnValue(Promise.resolve(-1))
    coreService.getPosts.and.returnValue(of(posts))
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display posts', () => {
    const compiled = el.nativeElement
    expect(compiled.querySelectorAll('.card')).toBeTruthy()
  })

  it('should display message if there are no posts', () => {
    coreService.getPosts.and.returnValue(of(null))
    fixture.detectChanges()
    const compiled = el.nativeElement
    expect(compiled.querySelector('.no-posts').textContent).toContain('No posts for now')
  })

  it('should fetch async subtract data', waitForAsync(() => {
    fixture.detectChanges()
    fixture.whenStable().then(
      () => {
        expect(component.subtractData).toBe(-1)
      }
    )
  }))

  it('should fetch async subtract data', fakeAsync(() => {
    fixture.detectChanges()
    tick()
    expect(component.subtractData).toBe(-1)
  }))

  it('should call getposts', () => {
    component.ngOnInit();
    expect(coreService.getPosts).toHaveBeenCalledTimes(1)
  })
})
