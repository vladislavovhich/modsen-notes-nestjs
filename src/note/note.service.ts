import { Injectable, NotFoundException } from '@nestjs/common';
import { TagService } from 'src/tag/tag.service';
import { Note, NoteDocument } from './schemas/note.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ImageService } from 'src/image/image.service';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class NoteService {
    constructor(
        private readonly tagService: TagService,
        private readonly imageService: ImageService,

        @InjectModel(Note.name)
        private noteModel: Model<NoteDocument>
    ) {}

    async findById(id: string) {
        const note = await this.noteModel.findById(id).populate("image").populate("tags")

        if (!note) {
            throw new NotFoundException("Note not found")
        }

        return note
    }

    findAll() {
        return this.noteModel.find().populate('tags').populate('image')
    }

    async create(createNoteDto: CreateNoteDto) {
        const {name, description, place, time, tags: tagNames, file} = createNoteDto
        const tags = await this.tagService.handleTags(tagNames)
        const note = new this.noteModel({name, description, place, time})

        if (file) {
            const image = await this.imageService.upload(file)

            note.image = image 
        }

        note.tags.push(...tags.map(tag => tag._id.toString()))

        await note.save()

        return note
    }

    async update(id: string, updateNoteDto: UpdateNoteDto) {
        const note = await this.noteModel.findById(id)
        const {name, description, place, time, tags: tagNames, file} = updateNoteDto
        const tags = await this.tagService.handleTags(tagNames)

        if (file) {
            const image = await this.imageService.upload(file)

            note.image = image 
        }

        note.tags = [...new Set([...tags.map(tag => tag._id.toString()), ...note.tags])]

        note.name = name
        note.description = description
        note.place = place
        note.time = time

        await note.save()

        return note
    }

    async delete(id: string) {
        const note = await this.findById(id)

        await note.deleteOne()
    }
}
