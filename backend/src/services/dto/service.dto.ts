import { IsString, IsArray, IsOptional, IsInt, Min } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  title: string;

  @IsString()
  icon: string;

  @IsString()
  items: string; // JSON array

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  items?: string; // JSON array

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}






