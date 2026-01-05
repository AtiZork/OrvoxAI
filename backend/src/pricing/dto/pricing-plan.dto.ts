import { IsString, IsArray, IsBoolean, IsOptional, IsInt, Min } from 'class-validator';

export class CreatePricingPlanDto {
  @IsString()
  price: string;

  @IsString()
  period: string;

  @IsString()
  features: string; // JSON array

  @IsOptional()
  @IsBoolean()
  highlight?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class UpdatePricingPlanDto {
  @IsOptional()
  @IsString()
  price?: string;

  @IsOptional()
  @IsString()
  period?: string;

  @IsOptional()
  @IsString()
  features?: string; // JSON array

  @IsOptional()
  @IsBoolean()
  highlight?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}






