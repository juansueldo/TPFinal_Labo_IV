export class Specialist{
    id? : string;
    name: string;
    lastName: string;
    age: number;
    dni: string;
    mail: string;
    specialty: string;
    img_1: string | undefined;

  
    constructor(name = '', lastName = '', age = 0, dni = '',mail = '', healthcare = '', id = '') {
      this.id = id;
      this.name = name;
      this.lastName = lastName;
      this.age = age;
      this.dni = dni;
      this.mail = mail;
      this.specialty = healthcare;
    }
  
  }