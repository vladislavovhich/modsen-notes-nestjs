import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Types, PopulatedDoc, HydratedDocument } from "mongoose";
import { NoteDocument } from "src/note/schemas/note.schema";

@Schema()
export class User {
    @Prop()
    username: string

    @Prop()
    password: string

    @Prop({type: [Types.ObjectId], ref: 'Note'}) 
    notes: PopulatedDoc<NoteDocument>[]
}

export type UserDocument = HydratedDocument<User>

export const UserSchema = SchemaFactory.createForClass(User)