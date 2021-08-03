import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { PostData } from '../models/share.model';
import { CoreService } from './core/core.service';

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<PostData> {
  constructor (private core: CoreService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<PostData> {
    return this.core.getPostData(route.params.id)
  }
}
