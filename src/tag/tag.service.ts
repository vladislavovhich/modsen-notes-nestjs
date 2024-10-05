import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, TagDocument } from './schemas/tag.schema';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TagResponseDto } from './dto/tag-response.dto';

@Injectable()
export class TagService {
    constructor(
        @InjectModel(Tag.name)
        private tagModel: Model<TagDocument>
    ) {}

    async handleTags(tagNames: string[]) {
        const tags: TagDocument[] = []

        for (let tagName of tagNames) {
            const isTagExists = await this.findByName(tagName)

            if (!isTagExists) {
                const tag = await this.create({name: tagName})

                tags.push(tag)
            } else {
                const tag = await this.findByName(tagName)

                tags.push(tag)
            }
        }

        return tags
    }

    async create(createTagDto: CreateTagDto) {
        const {name} = createTagDto

        const tag = new this.tagModel({name})

        return await tag.save()
    }

    async update(id: string, updateTagDto: UpdateTagDto) {
        await this.findById(id)

        const tag = await this.tagModel.findByIdAndUpdate(id, updateTagDto)

        return tag.save()
    }

    async findById(id: string) {
        const tag = await this.tagModel.findById(id)

        if (!tag) {
            throw new NotFoundException("Item not found")
        }

        return tag
    }

    findByName(name: string) {
        return this.tagModel.findOne({ name })
    }

    async findAll(paginationDto: PaginationDto) {
        const tags = await this.tagModel
            .find() 
            .skip(paginationDto.offset)
            .limit(paginationDto.pageSize)

        const count = await this.tagModel.countDocuments()

        return new TagResponseDto(tags, count, paginationDto)
    }

    async delete(id: string) {
        const tag = await this.findById(id)

        await tag.deleteOne()
    }
}
