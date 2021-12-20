import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Genre } from './entities/genre.entity';
import { Style } from './entities/style.entity';
import { Year } from './entities/year.entity';
import { Track } from './entities/track.entity';
import { Producer } from './entities/producer.entity';
import { Label } from './entities/label.entity';
import { Studio } from './entities/studio.entity';
import { Artist } from './entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Genre, Style, Year, Track, Producer, Label, Studio, Artist])],
  controllers: [AlbumController],
  providers: [AlbumService]
})
export class AlbumModule {}
