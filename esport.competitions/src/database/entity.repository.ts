import {
  CallbackError,
  Document,
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  protected constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: ProjectionType<T>,
  ): Promise<T | null> {
    return this.entityModel.findOne(entityFilterQuery, projection).exec();
  }

  async findById(
    _id: string,
    projection?: ProjectionType<T>,
  ): Promise<T | null> {
    return this.entityModel.findOne({ _id }, projection).exec();
  }

  async find(
    entityFilterQuery: FilterQuery<T>,
    projection?: ProjectionType<T>,
  ): Promise<T[] | null> {
    return this.entityModel.find(entityFilterQuery, projection).exec();
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T> {
    return this.entityModel
      .findOneAndUpdate(entityFilterQuery, updateEntityData, { new: true })
      .exec();
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteRes = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteRes.deletedCount >= 1;
  }

  async updateOne(
    filter?: FilterQuery<T>,
    update?: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: QueryOptions<T>,
    callback?: (error: CallbackError, result: T) => void,
  ) {
    return this.entityModel.updateOne(filter, update, options, callback);
  }
}
