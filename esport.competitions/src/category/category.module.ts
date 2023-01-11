import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryCommands } from './category.commands';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from './category.model';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryCommands],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
