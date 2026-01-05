import { IsString, IsOptional, IsBoolean, IsInt, Min } from 'class-validator';

export class CreateTestimonialDto {
  @IsString()
  text: string;

  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsBoolean()
  verified?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class UpdateTestimonialDto {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsBoolean()
  verified?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}







