import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ship', schema: 'public' })
export class ShipEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  fuel_capacity: number;

  @Column('int')
  fuel_level: number;

  @Column('int')
  cargo_capacity: number;
}
