import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OwnersService {
  public API = '//thawing-chamber-47973.herokuapp.com';
  public OWNERS_API = this.API + '/owners';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.OWNERS_API);
  }

  get(dni: string) {
    return this.http.get(this.OWNERS_API + '/search/findByDni?dni=' + dni);
  }

  save(owner: any): Observable<any> {
    let result: Observable<object>;
    if (owner.href) {
      result = this.http.put(this.OWNERS_API + `/${owner.dni}`, owner);
    } else {
      result = this.http.post(this.OWNERS_API, owner);
    }
    return result;
  }

  remove(href: string) {
    console.log(href);
    return this.http.delete(href);
  }
}
