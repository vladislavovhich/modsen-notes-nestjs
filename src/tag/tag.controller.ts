import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

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
    findAll() {
      return this.tagService.findAll()
    }

    @Post()
    create(@Body() createTagDto: CreateTagDto) {
      return this.tagService.create(createTagDto)
    }

    @Patch(":id")
    update(@Body() updateTagDto: UpdateTagDto, @Param("id") id: string) {
      return this.tagService.update(id, updateTagDto)
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
      return this.tagService.delete(id)
    }
}
