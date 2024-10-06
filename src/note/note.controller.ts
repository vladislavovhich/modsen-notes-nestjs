import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import { ApiBadGatewayResponse, ApiBadRequestResponse, ApiConsumes, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateNoteDto } from './dto/create-note.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotePaginationDto } from './dto/note-pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { NoteSchema } from './schemas/note.schema';
import { NoteDto } from './dto/note.dto';
import { NotesResponseDto } from './dto/note-response.dto';
import { UserDocument } from 'src/user/schemas/user.schema';
import { GetUser } from 'src/common/decorators/extract-user.decorator';
import { CheckOwnershipGuard } from './guards/check-ownership.guard';

@Controller('notes')
@ApiTags("Notes")
export class NoteController {
    constructor(private readonly noteService: NoteService) {}


    @Get(":id")

    @ApiOkResponse({type: NoteDto})
    @ApiNotFoundResponse({description: "Note not found"})
    @ApiBadRequestResponse({description: "Incorrect id format"})

    async findByd(@Param("id") id: string) {
        const note = await this.noteService.findById(id)

        return new NoteDto(note)
    }

    
    @Get()
    @ApiOkResponse({type: NotesResponseDto})
    findAll(@Query() notePaginationDto: NotePaginationDto) {
        return this.noteService.findAll(notePaginationDto)
    }


    @Post()

    @ApiBadRequestResponse({description: "Incorrect input data"})
    @ApiCreatedResponse({type: NoteDto})
    @ApiUnauthorizedResponse({description: "Not authorized"})
    @ApiConsumes("multipart/form-data")
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file', multerOptions))

    async create(
        @Body() createNoteDto: CreateNoteDto,  
        @UploadedFile() file: Express.Multer.File,
        @GetUser() user: UserDocument
    ) {
        createNoteDto.file = file
        createNoteDto.user = user

        const note = await this.noteService.create(createNoteDto)

        return new NoteDto(note)
    }


    @Patch(":id")

    @ApiConsumes("multipart/form-data")
    @ApiNotFoundResponse({description: "Note not found"})
    @ApiBadRequestResponse({description: "Incorrect input data"})
    @ApiOkResponse({type: NoteDto})
    @ApiUnauthorizedResponse({description: "Not authorized"})
    @ApiForbiddenResponse({description: "Resource doesn't belongs to user"})

    @UseGuards(CheckOwnershipGuard)
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file', multerOptions))

    async update(
        @Param("id") id: string,
        @Body() updateNoteDto: UpdateNoteDto,  
        @UploadedFile() file: Express.Multer.File
    ) {
        updateNoteDto.file = file

        const note = await this.noteService.update(id, updateNoteDto)

        return new NoteDto(note)
    }


    @Delete(":id")

    @ApiNotFoundResponse({description: "Note not found"})
    @ApiBadRequestResponse({description: "Incorrect id format"})
    @ApiOkResponse({description: "Note is successfully deleted"})
    @ApiUnauthorizedResponse({description: "Not authorized"})
    @ApiForbiddenResponse({description: "Resource doesn't belongs to user"})

    @UseGuards(CheckOwnershipGuard)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(CheckOwnershipGuard)

    delete(@Param("id") id: string) {
        this.noteService.delete(id)
    }
}
