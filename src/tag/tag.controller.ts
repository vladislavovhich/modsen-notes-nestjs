import { Body, Controller, Get, Param, Post, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { TagDto } from './dto/tag.dto';
import { TagResponseDto } from './dto/tag-response.dto';

@Controller('tags')
@ApiTags("Tags")
export class TagController {
    constructor(
      private readonly tagService: TagService
    ) {}

    @Get(":id")
    @ApiOkResponse({type: TagDto})
    @ApiBadRequestResponse({description: "Incorrect input data"})
    async findById(@Param("id") id: string) {
        const tag = await this.tagService.findById(id)

        return new TagDto(tag)
    }

    @Get()
    @ApiOkResponse({type: TagResponseDto})
    findAll(@Query() paginationDto: PaginationDto) {
      return this.tagService.findAll(paginationDto)
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBadRequestResponse({description: "Incorrect input data"})
    @ApiCreatedResponse({type: TagDto})
    @ApiUnauthorizedResponse({description: "User not authorized"})
    async create(@Body() createTagDto: CreateTagDto) {
      const tag = await this.tagService.create(createTagDto)

      return new TagDto(tag)
    }

    @Patch(":id")
    @UseGuards(AuthGuard('jwt'))
    @ApiBadRequestResponse({description: "Incorrect input data"})
    @ApiNotFoundResponse({description: "Tag not found"})
    @ApiOkResponse({type: TagDto})
    @ApiUnauthorizedResponse({description: "Not authorized"})
    async update(@Body() updateTagDto: UpdateTagDto, @Param("id") id: string) {
      const tag = await this.tagService.update(id, updateTagDto)

      return new TagDto(tag)
    }

    @Delete(":id")
    @UseGuards(AuthGuard('jwt'))
    @ApiBadRequestResponse({description: "Incorrect input data"})
    @ApiNotFoundResponse({description: "Tag not found"})
    @ApiUnauthorizedResponse({description: "Not authorized"})
    delete(@Param("id") id: string) {
      this.tagService.delete(id)
    }
}
