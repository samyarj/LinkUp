import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float', { array: true })
  location: number[];

  @Column({ nullable: true })
  place: string;
}
