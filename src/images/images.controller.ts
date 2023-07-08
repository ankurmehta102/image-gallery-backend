import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  Param,
  Get,
  ParseIntPipe,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import {
  JwtPayloadReceived,
  LocalAuthGuard,
} from 'src/guards/localAuthGuard.guard';

interface RequestWithUser extends Request {
  user: JwtPayloadReceived;
}

@Controller('images')
@UseGuards(LocalAuthGuard)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: RequestWithUser,
  ) {
    return this.imagesService.saveFile(file, request.user.sub);
  }

  @Get(':imageId')
  async getImage(
    @Param('imageId', ParseIntPipe) imageId: number,
    @Req() request: RequestWithUser,
  ) {
    return this.imagesService.getFile(
      imageId,
      request.user.sub,
      request.user.role,
    );
  }
}
