import { Test, TestingModule } from '@nestjs/testing';
import { TalkPhotoController } from './talk_photo.controller';
import { TalkPhotoService } from './talk_photo.service';

describe('TalkPhotoController', () => {
  let controller: TalkPhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalkPhotoController],
      providers: [TalkPhotoService],
    }).compile();

    controller = module.get<TalkPhotoController>(TalkPhotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
