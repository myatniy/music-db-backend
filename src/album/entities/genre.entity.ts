import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Album } from "./album.entity";

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Album, (album) => album.genres)
  albums: Album[];
}