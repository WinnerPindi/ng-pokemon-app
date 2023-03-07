import { Component} from '@angular/core';
import { Route, Router } from '@angular/router';
import { POKEMONS } from '../mock-pokemon-list';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';


@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  

})
export class ListPokemonComponent  {

  pokemonList?: Pokemon[];

  constructor(
    private router: Router,
    private pokemonService : PokemonService)
  {}

  ngOnInit(){
    this.pokemonService.getPokemonList()
      .subscribe(pokemonList => this.pokemonList = pokemonList);
  }

  goToPokemon(pokemon: Pokemon){
    this.router.navigate(['/pokemon', pokemon.id]);
  }

}
