import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contract', schema: 'public' })
export class ContractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @Column('int')
  payload_id: number;

  @Column('text')
  origin: string;

  @Column('text')
  destination: string;

  @Column('int')
  value: number;
}
