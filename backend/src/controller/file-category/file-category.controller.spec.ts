import { Test, TestingModule } from '@nestjs/testing';
import { FileCategoryController } from './file-category.controller';

describe('FileCategoryController', () => {
  let controller: FileCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileCategoryController],
    }).compile();

    controller = module.get<FileCategoryController>(FileCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
