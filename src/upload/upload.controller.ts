import { Controller, UploadedFile, UseInterceptors, Post } from '@nestjs/common';
import { UploadService } from './upload.service';
import {FileInterceptor} from '@nestjs/platform-express';
import { Public } from 'src/common/public.decorator';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Public()
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar (@UploadedFile() file) {
    return {
      url: "http://localhost:3000/image/" + file.filename,
      code: 0
    }
  }
}
