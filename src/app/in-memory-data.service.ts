import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { POKEMONS } from './pokemon/mock-pokemon-list'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService {

  createDb() {
    return { POKEMONS }
  }
}
