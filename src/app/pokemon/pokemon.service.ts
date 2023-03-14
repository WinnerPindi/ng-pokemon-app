import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {

  constructor(private http: HttpClient){}

/* Methode qui permet de recuperer la liste des pokemons */

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((response) => console.table(response)),
      catchError((error) => this.handleError(error,undefined))
    );
  }


  
/* Methode qui permet de recuperer un pokemon grâce à son ID */
getPokemonById(pokemonId : number): Observable<Pokemon|undefined> {
  return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
    tap((response) => console.log(response)),
    catchError((error) => this.handleError(error,undefined))
  );
}

/**Methode qui permet de rechercher un pokemon */

searchPokemonList(term: string): Observable<Pokemon[]>{
  if(term.length <= 1 ){
    return of ([]);
  }

  return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
    tap((response) => console.log(response)),
    catchError((error) => this.handleError(error,[]))
  )
}



/**Methode qui permet de sauvegarder les changements effectués
 * pour un pokémon
 */
updatePokemon(pokemon: Pokemon): Observable<null> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  };

  return this.http.put('api/pokemons', pokemon , httpOptions).pipe(
    tap((response) => this.log(response)),
    catchError((error) => this.handleError(error,null))
  );
}

/**Methode permettant d'ajouter un pokemon */

addPokemon(pokemon : Pokemon): Observable <Pokemon> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  };
  return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
    tap((response) => this.log(response)),
    catchError((error) => this.handleError(error, null))
  );
}

/**Methode permettant de supprimer un pokemon */

deletePokemonById(pokemonId: number): Observable<null> {
  return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
    tap((response) => this.log(response)),
    catchError((error) => this.handleError(error,null))
  );
}

/** Methode pour la gestion des erreurs afin d'éviter 
 * la multiplication du code
 */
private log(response: any){
  console.table(response);
}

private handleError(error: Error, errorValue: any){
  console.error(error);
  return of(errorValue);
}

  getPokemonTypeList() : string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ];
  }
}
