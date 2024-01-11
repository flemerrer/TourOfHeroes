import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  private heroesUrl = "http://localhost:3000/heroes"

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  constructor( private http: HttpClient, private messageService: MessageService) { }

  log(message: string): void {
    this.messageService.add(message);
  }

  getHeroes(): Observable<Hero[]> {
    
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHeroById(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    
    return this.http.get<Hero>(url)
      .pipe(
        tap( () => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  search(term: string): Observable<Hero[]> {
   
    if(!term.trim()){
      return of([]);
      // if not search term, return empty hero array.
      // utiliser le trim permet de ne pas chercher avec un / plusieurs espaces en paramètre
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap( x => x.length ? 
        this.log('found heroes matching ' + term) :
        this.log('no heroes matching ' + term)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
    ) 
  }

  // addHero(hero: Hero): void {
  //   this.http.post(this.heroesUrl, hero);
  //   this.log(`created hero id=${id}`))

  // }

  updateHero(hero: Hero) {
    let updatedHero = {
      "id": `"${hero.id}"`,
      "name": `"${hero.name}"`
    }
    this.http.put(this.heroesUrl + '/' + hero.id, updatedHero);
    this.log(`updated hero id=${hero.id}`);
  }

  // deleteHero(id: number) {
  //   this.http.delete(this.heroesUrl + '/' + id);
  //   this.log(`deleted hero id=${id}`))
  // }

}
