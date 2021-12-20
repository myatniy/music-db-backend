import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { Artist } from './entities/artist.entity';
import { Genre } from './entities/genre.entity';
import { Label } from './entities/label.entity';
import { Producer } from './entities/producer.entity';
import { Studio } from './entities/studio.entity';
import { Style } from './entities/style.entity';
import { Track } from './entities/track.entity';
import { Year } from './entities/year.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Genre)
    private readonly styleRepository: Repository<Style>,
    @InjectRepository(Year)
    private readonly yearRepository: Repository<Year>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
    @InjectRepository(Studio)
    private readonly studioRepository: Repository<Studio>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}
  
  async create(createAlbumDto: CreateAlbumDto) {
    const genres = await Promise.all(
      createAlbumDto.genres.map((name) => this.preloadGenreByName(name)),
    )
    const styles = await Promise.all(
      createAlbumDto.styles.map((name) => this.preloadStyleByName(name)),
    )
    const year = await Promise.all(
      createAlbumDto.year.map((name) => this.preloadYearByName(name)),
    )
    const tracks = await Promise.all(
      createAlbumDto.tracks.map((name) => this.preloadTrackByName(name)),
    )
    const producers = await Promise.all(
      createAlbumDto.producers.map((name) => this.preloadProducerByName(name)),
    )
    const labels = await Promise.all(
      createAlbumDto.labels.map((name) => this.preloadLabelByName(name)),
    )
    const studios = await Promise.all(
      createAlbumDto.studios.map((name) => this.preloadStudioByName(name)),
    )
    const artists = await Promise.all(
      createAlbumDto.artists.map((name) => this.preloadArtistByName(name)),
    )
    const album = this.albumRepository.create({
      ...createAlbumDto,
      genres,
      styles,
      year,
      tracks,
      producers,
      labels,
      studios,
      artists
    })
    return this.albumRepository.save(album);
  }

  findAll() {
    return this.albumRepository.find({
      relations: ['genres', 'styles', 'year', 'tracks', 'producers', 'labels', 'studios', 'artists'],
    })
  }

  async findOne(id: number) {
    const album = await this.albumRepository.findOne(id, {
      relations: ['genres', 'styles', 'year', 'tracks', 'producers', 'labels', 'studios', 'artists']
    })
    if (!album) {
      throw new NotFoundException(`Album #${id} not found`)
    }
    return album;
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const genres =
      updateAlbumDto.genres &&
      (await Promise.all(
        updateAlbumDto.genres.map((name) => this.preloadGenreByName(name))
      ))

    const styles =
      updateAlbumDto.styles &&
      (await Promise.all(
        updateAlbumDto.styles.map((name) => this.preloadStyleByName(name))
      ))

    const year =
      updateAlbumDto.year &&
      (await Promise.all(
        updateAlbumDto.year.map((name) => this.preloadYearByName(name))
      ))

    const tracks =
      updateAlbumDto.tracks &&
      (await Promise.all(
        updateAlbumDto.tracks.map((name) => this.preloadTrackByName(name))
      ))

    const producers =
      updateAlbumDto.producers &&
      (await Promise.all(
        updateAlbumDto.producers.map((name) => this.preloadProducerByName(name))
      ))

    const labels =
      updateAlbumDto.labels &&
      (await Promise.all(
        updateAlbumDto.labels.map((name) => this.preloadLabelByName(name))
      ))

    const studios =
      updateAlbumDto.studios &&
      (await Promise.all(
        updateAlbumDto.studios.map((name) => this.preloadStudioByName(name))
      ))

    const artists =
      updateAlbumDto.artists &&
      (await Promise.all(
        updateAlbumDto.artists.map((name) => this.preloadArtistByName(name))
      ))

    const album = await this.albumRepository.preload({
      id: id,
      ...updateAlbumDto,
      genres,
      styles,
      year,
      tracks,
      producers,
      labels,
      studios,
      artists
    });
    if (!album) {
      throw new NotFoundException(`Album #${id} not found`);
    }
    return this.albumRepository.save(album);
  }

  async remove(id: number) {
    const album = await this.findOne(id);
    return this.albumRepository.remove(album);
  }

  private async preloadGenreByName(name: string): Promise<Genre> {
    const existingGenre = await this.genreRepository.findOne({ name });
    if (existingGenre) {
      return existingGenre;
    }
    return this.genreRepository.create({ name });
  }

  private async preloadStyleByName(name: string): Promise<Style> {
    const existingStyle = await this.styleRepository.findOne({ name });
    if (existingStyle) {
      return existingStyle;
    }
    return this.styleRepository.create({ name });
  }

  private async preloadYearByName(name: string): Promise<Year> {
    const existingYear = await this.yearRepository.findOne({ name });
    if (existingYear) {
      return existingYear;
    }
    return this.yearRepository.create({ name });
  }

  private async preloadTrackByName(name: string): Promise<Track> {
    const existingTrack = await this.trackRepository.findOne({ name });
    if (existingTrack) {
      return existingTrack;
    }
    return this.trackRepository.create({ name });
  }

  private async preloadProducerByName(name: string): Promise<Producer> {
    const existingProducer = await this.producerRepository.findOne({ name });
    if (existingProducer) {
      return existingProducer;
    }
    return this.producerRepository.create({ name });
  }

  private async preloadLabelByName(name: string): Promise<Label> {
    const existingLabel = await this.labelRepository.findOne({ name });
    if (existingLabel) {
      return existingLabel;
    }
    return this.labelRepository.create({ name });
  }

  private async preloadStudioByName(name: string): Promise<Studio> {
    const existingStudio = await this.studioRepository.findOne({ name });
    if (existingStudio) {
      return existingStudio;
    }
    return this.studioRepository.create({ name });
  }

  private async preloadArtistByName(name: string): Promise<Artist> {
    const existingArtist = await this.artistRepository.findOne({ name });
    if (existingArtist) {
      return existingArtist;
    }
    return this.artistRepository.create({ name });
  }
}
