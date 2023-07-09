import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Param,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  JwtPayloadReceived,
  LocalAuthGuard,
} from 'src/guards/localAuthGuard.guard';
import { GetUser } from 'src/decorators/getUser.decorator';

// interface RequestWithUser extends Request {
//   user: JwtPayloadReceived;
// }

@Controller('images')
@UseGuards(LocalAuthGuard)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: JwtPayloadReceived,
  ) {
    return this.imagesService.saveFile(file, user.sub);
  }

  @Get(':imageId')
  async getImage(
    @Param('imageId', ParseIntPipe) imageId: number,
    @GetUser() user: JwtPayloadReceived,
  ) {
    return this.imagesService.getFile(imageId, user.sub, user.role);
  }
}
