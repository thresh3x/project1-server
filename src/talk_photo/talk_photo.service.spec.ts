import { Test, TestingModule } from '@nestjs/testing';
import { TalkPhotoService } from './talk_photo.service';

describe('TalkPhotoService', () => {
  let service: TalkPhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TalkPhotoService],
    }).compile();

    service = module.get<TalkPhotoService>(TalkPhotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
