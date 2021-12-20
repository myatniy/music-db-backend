import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Album } from "./album.entity";

@Entity()
export class Studio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Album, (album) => album.studios)
  albums: Album[];
}