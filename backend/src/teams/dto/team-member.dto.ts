import { IsString, IsOptional, IsArray, IsUrl } from 'class-validator';

export class CreateTeamMemberDto {
  @IsString()
  name: string;

  @IsString()
  role: string;

  @IsString()
  slug: string;

  @IsString()
  image: string;

  @IsString()
  bio: string;

  @IsString()
  skills: string; // JSON array

  @IsString()
  icon: string;

  @IsString()
  color: string;

  @IsString()
  groupId: string;

  @IsOptional()
  @IsUrl()
  linkedin?: string;

  @IsOptional()
  @IsUrl()
  twitter?: string;

  @IsOptional()
  @IsUrl()
  github?: string;
}

export class UpdateTeamMemberDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  skills?: string; // JSON array

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  groupId?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsOptional()
  @IsString()
  twitter?: string;

  @IsOptional()
  @IsString()
  github?: string;
}






