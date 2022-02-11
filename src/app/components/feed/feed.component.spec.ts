import { DebugElement } from '@angular/core'
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { PostCardComponent } from 'components/post-card/post-card.component'
import { of } from 'rxjs'
import { posts } from '../../constants/db-testing.constant'

import { CoreService } from '../../services/core/core.service'

import { FeedComponent } from './feed.component'
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { RootStoreModule } from '../../root-store/root-store.module';
import { GetPostsAction } from '../../root-store/actions';
import SpyObj = jasmine.SpyObj;
import Spy = jasmine.Spy;

describe('FeedComponent', () => {
  let component: FeedComponent
  let fixture: ComponentFixture<FeedComponent>
  let el: DebugElement
  let coreService: SpyObj<CoreService>
  let storeDispatchSpy: Spy
  let store: Store<RootStoreModule>

  beforeEach(waitForAsync(() => {
    const coreServiceSpy = jasmine.createSpyObj('CoreService', ['getPosts', 'asyncSubtract'])
    TestBed.configureTestingModule({
      declarations: [FeedComponent, PostCardComponent],
      providers: [
        { provide: CoreService, useValue: coreServiceSpy },
        provideMockStore()
      ],
      imports: [RouterTestingModule],
    }).compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent)
    component = fixture.debugElement.componentInstance
    store = TestBed.inject(Store)
    el = fixture.debugElement
    coreService = TestBed.inject(CoreService) as SpyObj<CoreService>;
    coreService.asyncSubtract.and.returnValue(Promise.resolve(-1))
    coreService.getPosts.and.returnValues(of(posts))
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('#ngOnInit', () => {
    it('should load posts via store', () => {
      storeDispatchSpy = spyOn(store, 'dispatch')

      component.ngOnInit()

      const expected = GetPostsAction()
      expect(storeDispatchSpy).toHaveBeenCalledWith(expected)
    })

    it('should load posts', () => {
      component.posts = null;

      component.ngOnInit()

      expect(component.posts).toEqual(posts);
    })

    it('should load subtracted data', fakeAsync((done) => {
      component.subtractData = null;

      component.ngOnInit()
      tick()
      expect(component.subtractData).toEqual(-1)
    })
    )
  })

  it('should display posts', () => {
    const compiled = el.nativeElement
    expect(compiled.querySelectorAll('app-post-card').length).toBeTruthy()
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
