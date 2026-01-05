import { IsString, IsOptional, IsArray, IsIn } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  category: string;

  @IsString()
  description: string;

  @IsString()
  @IsIn(['featured', 'ongoing', 'completed'])
  status: string;

  @IsOptional()
  @IsString()
  technologies?: string; // JSON array

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  memberIds?: string[];
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(['featured', 'ongoing', 'completed'])
  status?: string;

  @IsOptional()
  @IsString()
  technologies?: string; // JSON array

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  memberIds?: string[];
}






