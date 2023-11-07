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
  showCaptcha: boolean = false;
  constructor(private pokeapiService: PokeapiService){}

  ngOnInit() {
    this.getRandomPokemon();
    
  }

  getRandomPokemon() {
    this.pokeapiService.getRandomPokemon().subscribe(
      (response) => {
        const pokemonName = response.name[0].toUpperCase() + response.name.substring(1);
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.id}.png`;
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
  toggleCaptcha() {
    this.showCaptcha = !this.showCaptcha; // Cambia el estado del captcha
  }/*
  number1: number;
  number2: number;
  operator: string;
  correctAnswer: number;
  options: number[];

  constructor() {
    this.generateCaptcha();
  }

  generateCaptcha() {
    this.number1 = Math.floor(Math.random() * 10); // Número aleatorio del 0 al 9
    this.number2 = Math.floor(Math.random() * 10);
    this.operator = Math.random() < 0.5 ? '+' : '-'; // Operador aleatorio: suma o resta

    if (this.operator === '+') {
      this.correctAnswer = this.number1 + this.number2;
    } else {
      this.correctAnswer = this.number1 - this.number2;
    }

    // Genera opciones de respuesta aleatorias
    this.options = this.generateOptions(this.correctAnswer, 4); // Genera 4 opciones incluyendo la correcta
  }

  generateOptions(correctAnswer: number, numOptions: number): number[] {
    const options: number[] = [correctAnswer];

    while (options.length < numOptions) {
      const randomOption = this.generateRandomOption(correctAnswer);
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }

    return this.shuffleArray(options);
  }

  generateRandomOption(correctAnswer: number): number {
    // Genera un valor aleatorio dentro de un rango que no sea igual al valor correcto
    let randomOption = correctAnswer;
    while (randomOption === correctAnswer) {
      randomOption = Math.floor(Math.random() * 20); // Puedes ajustar el rango según tus necesidades
    }
    return randomOption;
  }

  shuffleArray(array: number[]): number[] {
    // Baraja el array de opciones
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  checkAnswer(selectedAnswer: number): boolean {
    return selectedAnswer === this.correctAnswer;
  }*/
}
