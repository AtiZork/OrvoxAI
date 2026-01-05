import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateAboutContentDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class UpdateAboutContentDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}







