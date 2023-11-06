import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getRandomPokemon(): Observable<any> {
    const randomId = Math.floor(Math.random() * 150) + 1;
    return this.http.get(`${this.apiUrl}/${randomId}`);
  }

  getPokemonNameById(id: number): Observable<string> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.name)
    );
  }
}