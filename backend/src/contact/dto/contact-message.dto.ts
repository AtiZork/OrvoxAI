import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateContactMessageDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsString()
  message: string;
}

export class UpdateContactMessageDto {
  @IsOptional()
  read?: boolean;
}

