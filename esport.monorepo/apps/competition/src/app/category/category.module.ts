import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryEventEmitter } from './category.event-emitter';
import { CategoryRepository } from './category.repository';

import { CategoryService } from './category.service';
import { CategoryCommands } from './controllers/category.commands';
import { CategoryQueries } from './controllers/category.queries';

import { Category, CategorySchema } from './models/category.model';
import { Round, RoundSchema } from './models/round.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Round.name, schema: RoundSchema },
    ]),
  ],
  providers: [CategoryService, CategoryRepository, CategoryEventEmitter],
  exports: [CategoryService],
  controllers: [CategoryCommands, CategoryQueries],
})
export class CategoryModule {}
