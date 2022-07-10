import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pilot', schema: 'public' })
export class PilotEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  certification: string;

  @Column('text')
  name: string;

  @Column('int')
  age: number;

  @Column('int')
  credits: number;

  @Column('text')
  current_planet: string;
}
