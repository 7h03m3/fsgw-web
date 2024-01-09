import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RegistrationType } from '../../shared/enums/registration-type.enum';
import { RegistrationDto } from '../../shared/dtos/registration.dto';

@Entity('registrations')
export class RegistrationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RegistrationType,
    default: [RegistrationType.JSK],
  })
  type: RegistrationType;

  @Column()
  year: number;

  @Column({ type: 'bigint' })
  date: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  street: string;

  @Column()
  zip: number;

  @Column()
  location: string;

  @Column({ type: 'bigint' })
  birthDate: number;

  @Column()
  nationality: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  insuranceNumber: string;

  public loadFromDto(dto: RegistrationDto) {
    this.id = dto.id;
    this.type = dto.type;
    this.year = dto.year;
    this.date = dto.date;
    this.firstname = dto.firstname;
    this.lastname = dto.lastname;
    this.street = dto.street;
    this.zip = dto.zip;
    this.location = dto.location;
    this.birthDate = dto.birthDate;
    this.nationality = dto.nationality;
    this.email = dto.email;
    this.mobile = dto.mobile;
    this.insuranceNumber = dto.insuranceNumber;
  }
}
