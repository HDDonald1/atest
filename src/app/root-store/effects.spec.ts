import { Observable } from 'rxjs'
import { RootEffects } from './effects'
import { Store } from '@ngrx/store'
import { RootStoreModule } from './root-store.module'
import { CoreService } from '../services/core/core.service'
import { TestBed, waitForAsync } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { cold, hot } from 'jasmine-marbles'
import { TestColdObservable } from 'jasmine-marbles/src/test-observables'
import { GetPostsAction, SetPostsAction } from './actions'

describe('RootEffects', () => {
  const postMock = { userId: 0, id: 0, title: 'fakeTitle', body: 'fakeBody' }
  let actions: Observable<unknown>
  let effects: RootEffects
  let coreService: CoreService
  let store: Store<RootStoreModule>
  let storeDispatchSpy: jasmine.Spy

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          RootEffects,
          CoreService,
          provideMockActions(() => actions),
          provideMockStore(),
        ],
      })
    })
  )

  beforeEach(() => {
    effects = TestBed.inject(RootEffects)
    coreService = TestBed.inject(CoreService)
    store = TestBed.inject(Store)
  })

  describe('loadPosts$', () => {
    describe('success flow', () => {
      it('should call getPost service method', () => {
        const action = GetPostsAction()

        actions = hot('-a', { a: action })
        const response: TestColdObservable = cold('-a|', { a: [postMock] })

        const getPostsSpy = spyOn(coreService, 'getPosts').and.returnValue(response)

        effects.loadPosts$.subscribe(() => expect(getPostsSpy).toHaveBeenCalled())
      })

      it('should store posts', () => {
        const action = GetPostsAction()
        const outcome = SetPostsAction({ posts: [postMock] })

        actions = hot('-a', { a: action })
        const response: TestColdObservable = cold('-a|', { a: [postMock] })

        spyOn(coreService, 'getPosts').and.returnValue(response)

        const expected: TestColdObservable = cold('--b', { b: outcome })
        expect(effects.loadPosts$).toBeObservable(expected)
      })
    })
  })
})
