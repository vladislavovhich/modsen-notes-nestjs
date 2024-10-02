import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { NoteService } from './note.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateNoteDto } from './dto/create-note.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
@ApiTags("Notes")
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Get(":id")
    findByd(@Param("id") id: string) {
        return this.noteService.findById(id)
    }

    @Get()
    findAll() {
        return this.noteService.findAll()
    }


    @Post()
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(FileInterceptor('file', multerOptions))
    create(@Body() createNoteDto: CreateNoteDto,  @UploadedFile() file: Express.Multer.File) {
        createNoteDto.file = file

        return this.noteService.create(createNoteDto)
    }

    @Patch(":id")
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(FileInterceptor('file', multerOptions))
    update(
        @Param("id") id: string,
        @Body() updateNoteDto: UpdateNoteDto,  
        @UploadedFile() file: Express.Multer.File
    ) {
        updateNoteDto.file = file

        return this.noteService.update(id, updateNoteDto)
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.noteService.delete(id)
    }
}
