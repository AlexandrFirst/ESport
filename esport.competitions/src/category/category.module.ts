import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FightModule } from '../fight/fight.module';

import { CategoryCommands } from './category.commands';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from './category.model';
import { CategoryRepository } from './category.repository';
import { CategoryEventEmitter } from './category.event-emitter';
import { CategoryQueries } from './category.queries';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    FightModule,
  ],
  controllers: [CategoryQueries, CategoryCommands],
  providers: [CategoryService, CategoryRepository, CategoryEventEmitter],
  exports: [CategoryService],
})
export class CategoryModule {}
