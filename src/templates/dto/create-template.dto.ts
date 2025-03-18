import { IsNotEmpty, IsNumber, IsString, IsBoolean, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTemplateDto {
  @ApiProperty({ description: 'Título del template' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Descripción del template' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Precio del template' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'URL de la imagen principal' })
  @IsNotEmpty()
  @IsString()
  main_image: string;

  @ApiProperty({ description: 'Array de URLs de imágenes adicionales', type: [String] })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ description: 'Estado de habilitación del template', default: true })
  @IsOptional()
  @IsBoolean()
  enabled: boolean = true;
}