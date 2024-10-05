import { Image } from 'src/image/schemas/image.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, PopulatedDoc, Types } from 'mongoose';
import { Tag, TagDocument } from 'src/tag/schemas/tag.schema';

export type NoteDocument = HydratedDocument<Note>

@Schema()
export class Note {
    @Prop()
    name: string

    @Prop()
    description: string

    @Prop()
    place: string

    @Prop()
    time: Date

    @Prop({ type: Types.ObjectId, ref: 'Image' })
    image: PopulatedDoc<Image>; 

    @Prop({type: [Types.ObjectId], ref: 'Tag'}) 
    tags: PopulatedDoc<TagDocument>[]
}

export const NoteSchema = SchemaFactory.createForClass(Note)