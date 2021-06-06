import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('planet')
export default class Planet {
  @ObjectIdColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  climate: string;

  @Column()
  terrain: string;

  @Column()
  films: Array<string>;
}
