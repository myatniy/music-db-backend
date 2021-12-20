import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Album } from "./album.entity";

@Entity()
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Album, (album) => album.labels)
  albums: Album[];
}