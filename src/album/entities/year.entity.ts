import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Album } from "./album.entity";

@Entity()
export class Year {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Album, (album) => album.year)
  albums: Album[];
}