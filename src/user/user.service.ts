import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>
    ) {}

    findByUsername(username: string) {
      return this.userModel.findOne({username})
    }

    async create(createUserDto: CreateUserDto) {
      const userFound = await this.findByUsername(createUserDto.username)

      if (userFound) {
        throw new BadRequestException("User with this username exists")
      }

      const user = new this.userModel(createUserDto)

      await user.save()

      return user
    }
}
