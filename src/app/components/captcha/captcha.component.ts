import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent {
  @Output() captchaSuccess = new EventEmitter<boolean>();
  pokemonImage: string;
  options: string[] = [];
  pokemonNameCorrect: string;
  rounds : number = 0;
  check: string;
  mensaje: string;
  disabledButton: boolean = false;
  colorText: string;
  constructor(private pokeapiService: PokeapiService){}

  ngOnInit() {
    this.getRandomPokemon();
    
  }

  getRandomPokemon() {
    this.pokeapiService.getRandomPokemon().subscribe(
      (response) => {
        const pokemonName = response.name[0].toUpperCase() + response.name.substring(1);
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.id}.png`/*response.sprites.front_default*/;
        this.pokemonImage = imageUrl;
        this.pokemonNameCorrect =pokemonName.toUpperCase();
        this.generateOptions(pokemonName);
      },
      (error) => {
        console.error('Error al obtener un Pokémon aleatorio: ', error);
      }
    );
  }

  generateOptions(correctName: string) {
    const correctOptionIndex = Math.floor(Math.random() * 3);

    this.options = [];
    for (let i = 0; i <= 2; i++) {
      if (i === correctOptionIndex) {
        this.options.push(correctName.toUpperCase());
      } else {
        this.getRandomPokemonName().subscribe(
          (name) => {
            this.options.push(name.toUpperCase());
            this.shuffleOptions();
          }
        );
      }
    }
    this.shuffleOptions();
  }
  shuffleOptions() {
    this.options.sort(() => Math.random() - 0.5);
  }
  getRandomPokemonName() {
    const randomId = Math.floor(Math.random() * 150) + 1;
    return this.pokeapiService.getPokemonNameById(randomId);
  }

  checkAnswer(selectedName: string, correctName: string) {
    if (selectedName === correctName) {
      this.captchaSuccess.emit(true);
      this.check = '../../../assets/gif/check.gif';
      this.colorText = "green";
      this.mensaje = 'Correcto';
      this.disabledButton = true;
      setTimeout(()=>{
        this.check = '';
        this.mensaje = '';
      },2000)
    }else{
      this.captchaSuccess.emit(false);
      this.check = '../../../assets/gif/error.gif';
      this.mensaje = 'Incorrecto, intente nuevamente';
      this.disabledButton = true;
      this.colorText = "red";
      setTimeout(()=>{
        this.check = '';
        this.mensaje = '';
        this.disabledButton = false;
      },2000)
      this.getRandomPokemon();
    }
  }
}
