import { Body, Controller, Get, Param, Post, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tags')
@ApiTags("Tags")
export class TagController {
    constructor(
      private readonly tagService: TagService
    ) {}

    @Get(":id")
    findById(@Param("id") id: string) {
        return this.tagService.findById(id)
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
      return this.tagService.findAll(paginationDto)
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createTagDto: CreateTagDto) {
      return this.tagService.create(createTagDto)
    }

    @Patch(":id")
    @UseGuards(AuthGuard('jwt'))
    update(@Body() updateTagDto: UpdateTagDto, @Param("id") id: string) {
      return this.tagService.update(id, updateTagDto)
    }

    @Delete(":id")
    @UseGuards(AuthGuard('jwt'))
    delete(@Param("id") id: string) {
      return this.tagService.delete(id)
    }
}
