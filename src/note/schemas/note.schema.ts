import { Image, ImageDocument } from 'src/image/schemas/image.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, PopulatedDoc, Types } from 'mongoose';
import { Tag, TagDocument } from 'src/tag/schemas/tag.schema';
import { UserDocument } from 'src/user/schemas/user.schema';

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
    image: PopulatedDoc<ImageDocument>; 

    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: PopulatedDoc<UserDocument>; 

    @Prop({type: [Types.ObjectId], ref: 'Tag'}) 
    tags: PopulatedDoc<TagDocument>[]
}

export type NoteDocument = HydratedDocument<Note>

export const NoteSchema = SchemaFactory.createForClass(Note)