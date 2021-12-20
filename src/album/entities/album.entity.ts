import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "./artist.entity";
import { Genre } from "./genre.entity";
import { Label } from "./label.entity";
import { Producer } from "./producer.entity";
import { Studio } from "./studio.entity";
import { Style } from "./style.entity";
import { Track } from "./track.entity";
import { Year } from "./year.entity";

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @JoinTable()
  @ManyToMany((type) => Genre, (genre) => genre.albums, {
    cascade: true,
  })
  genres: Genre[]

  @JoinTable()
  @ManyToMany((type) => Style, (style) => style.albums, {
    cascade: true,
  })
  styles: Style[]

  @JoinTable()
  @ManyToMany((type) => Year, (year) => year.albums, {
    cascade: true,
  })
  year: Year[]

  @JoinTable()
  @ManyToMany((type) => Track, (track) => track.albums, {
    cascade: true,
  })
  tracks: Track[]

  @JoinTable()
  @ManyToMany((type) => Producer, (producer) => producer.albums, {
    cascade: true,
  })
  producers: Producer[]

  @JoinTable()
  @ManyToMany((type) => Label, (label) => label.albums, {
    cascade: true,
  })
  labels: Label[]

  @JoinTable()
  @ManyToMany((type) => Studio, (studio) => studio.albums, {
    cascade: true,
  })
  studios: Studio[]

  @JoinTable()
  @ManyToMany((type) => Artist, (artist) => artist.albums, {
    cascade: true,
  })
  artists: Artist[]
}
