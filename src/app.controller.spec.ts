import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('uploadFile', () => {
    it('should upload a file', async () => {
      const mockFile = {
        fieldname: 'file',
        originalname: 'test.csv',
        encoding: '7bit',
        mimetype: 'text/csv',
        buffer: Buffer.from('Result Time,Granularity Period,Object Name,Reliability,L.Cell.Avail.Dur\n2022-07-22 13:30+09:00,Minutes,Test Object,Reliable,900\n'),
        size: 101,
      };
      
      const result = await appController.uploadFile(mockFile);

      expect(result).toBe('Data successfully inserted to MongoDB.');
    });
  });
});
