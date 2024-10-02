import { Image } from 'src/image/schemas/image.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

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

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image' })
    image: Image; 

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]) 
    tags: string[];
}

export const NoteSchema = SchemaFactory.createForClass(Note)