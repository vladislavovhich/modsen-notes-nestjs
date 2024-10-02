import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'process';
import { DbConfig } from 'src/config/config.types';

@Module({
  imports: [
    MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const {name, url} = configService.get<DbConfig>('db')

            return {
                uri: url,
                dbName: name
            }
        }
      }),
  ]
})
export class DatabaseModule {}