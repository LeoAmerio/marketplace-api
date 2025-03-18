// src/templates/templates.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Templates')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo template' })
  @ApiResponse({ status: 201, description: 'Template creado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templatesService.create(createTemplateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los templates' })
  @ApiResponse({ status: 200, description: 'Lista de templates obtenida exitosamente' })
  findAll() {
    return this.templatesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un template por ID' })
  @ApiParam({ name: 'id', description: 'ID del template' })
  @ApiResponse({ status: 200, description: 'Template encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Template no encontrado' })
  findOne(@Param('id') id: string) {
    return this.templatesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un template' })
  @ApiParam({ name: 'id', description: 'ID del template' })
  @ApiResponse({ status: 200, description: 'Template actualizado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Template no encontrado' })
  update(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto) {
    return this.templatesService.update(id, updateTemplateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un template' })
  @ApiParam({ name: 'id', description: 'ID del template' })
  @ApiResponse({ status: 200, description: 'Template eliminado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Template no encontrado' })
  remove(@Param('id') id: string) {
    return this.templatesService.remove(id);
  }
}