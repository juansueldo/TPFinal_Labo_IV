export class Patient{
    id? : string;
    name: string;
    lastName: string;
    age: number;
    dni: string;
    mail: string;
    healthcare: string;
    img_1: string | undefined;
    img_2: string | undefined;
  
    constructor(name = '', lastName = '', age = 0, dni = '',mail = '', healthcare = '', id = '') {
      this.id = id;
      this.name = name;
      this.lastName = lastName;
      this.age = age;
      this.dni = dni;
      this.mail = mail;
      this.healthcare = healthcare;
    }
  
  }