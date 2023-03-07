import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form-component.css']
})
export class PokemonFormComponent implements OnInit {
  @Input()pokemon!: Pokemon;
  types!: string[];

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit() {
    // Recuperer la liste des pokemons 
    this.types =this.pokemonService.getPokemonTypeList();
  }

  hasType(type: string) : boolean {
    //On vérifie si un pokemon a un type
    return this.pokemon.types.includes(type);
  }

  selectType($event: Event, type: string) {

    const isChecked: boolean = ($event.target as HTMLInputElement).checked;
     if(isChecked){
      this.pokemon?.types.push(type);
     }else {
      const index = this.pokemon?.types.indexOf(type);
      this.pokemon.types.splice(index, 1);

     }
  }
  isTypesValid(type: string): boolean{

    if(this.pokemon.types.length == 1 && this.hasType(type)){
      return false;
    }

    if(this.pokemon.types.length > 2 && !this.hasType(type)){
      return false;
    }
    return true;
  }

// On redirige l'utilisateur vers le pokemon qu'il a modifié 
  onSubmit(){
    this.pokemonService.updatePokemon(this.pokemon)
      .subscribe((pokemon) =>  this.router.navigate(['/pokemon', this.pokemon.id]));
  }

}
