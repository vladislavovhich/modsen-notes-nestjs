import { Injectable, NotFoundException } from '@nestjs/common';
import { TagService } from 'src/tag/tag.service';
import { Note, NoteDocument } from './schemas/note.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ImageService } from 'src/image/image.service';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotFoundError } from 'rxjs';
import { NotePaginationDto } from './dto/note-pagination.dto';
import { NotesResponseDto } from './dto/note-response.dto';

@Injectable()
export class NoteService {
    constructor(
        private readonly tagService: TagService,
        private readonly imageService: ImageService,

        @InjectModel(Note.name)
        private noteModel: Model<Note>
    ) {}

    async findById(id: string) {
        const note = await this.noteModel.findById(id).populate("image").populate("tags")

        if (!note) {
            throw new NotFoundException("Note not found")
        }

        return note
    }

    async findAll(notePaginationDto: NotePaginationDto) {
        let sortParams = {
            "place": notePaginationDto.placeOrder as SortOrder,
            "name": notePaginationDto.nameOrder as SortOrder,
            "time": notePaginationDto.timeOrder as SortOrder
        }

        const filterParams = {} as Record<string, any>

        if (notePaginationDto.nameFilter) {
            filterParams.name = notePaginationDto.nameFilter
        }

        if (notePaginationDto.placeFilter) {
            filterParams.place = notePaginationDto.placeFilter
        }

        if (notePaginationDto.timeFilter) {
            filterParams.time = {$gt: new Date(notePaginationDto.timeFilter)}
        }

        const notes = await this.noteModel
            .find(filterParams)
            .sort(sortParams)
            .skip(notePaginationDto.offset)
            .limit(notePaginationDto.pageSize)
            .populate("tags")
            .populate("image")
        
        const count = await this.noteModel.countDocuments(filterParams)

        return new NotesResponseDto(notes, count, notePaginationDto)
    }

    async create(createNoteDto: CreateNoteDto) {
        const {name, description, place, time, tags: tagNames, file} = createNoteDto
        const tags = await this.tagService.handleTags(tagNames)
        const note = new this.noteModel({name, description, place, time})

        if (file) {
            const image = await this.imageService.upload(file)

            note.image = image 
        }

        note.tags = tags.map(tag => tag._id)

        await note.save()

        return note
    }

    async update(id: string, updateNoteDto: UpdateNoteDto) {
        const note = await this.findById(id)
        const tags = await this.tagService.handleTags(updateNoteDto.tags)

        if (updateNoteDto.file) {
            const image = await this.imageService.upload(updateNoteDto.file)

            note.image = image 
        }

        for (let tag of tags) {
            if (!note.tags.some(tg => tg._id.toString() == tag._id.toString())) {
                note.tags.push(tag._id)
            }
        }

        await this.noteModel.findByIdAndUpdate(id, {$set: {...updateNoteDto, image: note.image, tags: note.tags}})

        return this.findById(id)
    }

    async delete(id: string) {
        const note = await this.findById(id)

        await note.deleteOne()
    }
}
