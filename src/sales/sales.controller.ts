import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva venta' })
  @ApiResponse({ status: 201, description: 'Venta creada exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todas las ventas (solo admin)' })
  @ApiResponse({ status: 200, description: 'Lista de ventas obtenida exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll() {
    return this.salesService.findAll();
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener ventas del usuario actual' })
  @ApiResponse({ status: 200, description: 'Ventas del usuario obtenidas exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findByUser(@Request() req) {
    return this.salesService.findByUser(req.user.userId);
  }

  @Get('analytics')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener análisis de ventas (solo admin)' })
  @ApiResponse({ status: 200, description: 'Análisis de ventas obtenido exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  getSalesAnalytics() {
    return this.salesService.getSalesAnalytics();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una venta por ID' })
  @ApiResponse({ status: 200, description: 'Venta encontrada exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada' })
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar estado de una venta (solo admin)' })
  @ApiResponse({ status: 200, description: 'Estado de venta actualizado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada' })
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.salesService.updateStatus(id, body.status);
  }
}