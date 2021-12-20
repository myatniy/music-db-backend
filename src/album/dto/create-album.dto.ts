import { IsString } from "class-validator";

export class CreateAlbumDto {
  @IsString()
  readonly name: string;

  @IsString({ each: true })
  readonly genres: string[];

  @IsString({ each: true })
  readonly styles: string[];

  @IsString({ each: true })
  readonly year: string[];

  @IsString({ each: true })
  readonly tracks: string[];

  @IsString({ each: true })
  readonly producers: string[];

  @IsString({ each: true })
  readonly labels: string[];

  @IsString({ each: true })
  readonly studios: string[];

  @IsString({ each: true })
  readonly artists: string[];
}
