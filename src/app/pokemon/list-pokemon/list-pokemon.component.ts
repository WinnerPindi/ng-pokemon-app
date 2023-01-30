import { Component} from '@angular/core';
import { Route, Router } from '@angular/router';
import { POKEMONS } from '../mock-pokemon-list';
import { Pokemon } from '../pokemon';


@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',

})
export class ListPokemonComponent  {

  pokemonList: Pokemon[] =POKEMONS ;
  pokemonSelected?: Pokemon;

  constructor(private router: Router){}

  goToPokemon(pokemon: Pokemon){
    this.router.navigate(['/pokemon', pokemon.id]);
  }

}
