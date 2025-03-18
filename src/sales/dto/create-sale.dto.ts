import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleDto {
  @ApiProperty({ description: 'ID del usuario que realiza la compra' })
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @ApiProperty({ description: 'ID del template comprado' })
  @IsNotEmpty()
  @IsUUID()
  template_id: string;

  @ApiProperty({ description: 'Monto de la venta' })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Método de pago utilizado' })
  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @ApiProperty({ description: 'ID del pago en el sistema de pagos' })
  @IsString()
  payment_id: string;

  @ApiProperty({ description: 'Estado de la venta', default: 'pending' })
  @IsString()
  status: string = 'pending';
}