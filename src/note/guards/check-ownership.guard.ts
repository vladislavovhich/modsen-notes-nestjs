import { Injectable, CanActivate, ExecutionContext, ForbiddenException, BadRequestException, forwardRef, Inject } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { NoteService } from "../note.service";
import { UserDocument } from "src/user/schemas/user.schema";

@Injectable()
export class CheckOwnershipGuard implements CanActivate {
  constructor(
      private readonly noteService: NoteService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const note = await this.noteService.findById(request.params.id)
    const user: UserDocument = await request.user

    if (!note.user || note.user._id.toString() != user._id.toString()) {
        throw new ForbiddenException("You can't access this resource...")
    }

    return true;
  }
}