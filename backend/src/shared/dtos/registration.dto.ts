import { RegistrationType } from '../enums/registration-type.enum';

export class RegistrationDto {
  id: number = 0;
  type: RegistrationType = RegistrationType.JSK;
  year: number = 0;
  date: number = Date.now();
  firstname: string = '';
  lastname: string = '';
  street: string = '';
  zip: number = 0;
  location: string = '';
  birthDate: number = 0;
  nationality: string = '';
  email: string = '';
  mobile: string = '';
  insuranceNumber: string = '';
}
