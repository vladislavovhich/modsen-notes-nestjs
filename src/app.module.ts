import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import config from './config/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TagModule } from './tag/tag.module';
import { NoteModule } from './note/note.module';
import { ImageModule } from './image/image.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true
    }),
    TagModule,
    NoteModule,
    ImageModule,
    CloudinaryModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
