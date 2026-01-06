import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateTeamGroupDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class UpdateTeamGroupDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}








