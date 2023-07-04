type Service<TEntity> = (entity: TEntity) => Promise<TEntity>;

export const createRange = async <T>(arr: T[], service: Service<T>) => {
  const entities: T[] = [];
  for (const entity of arr) {
    const newFight = await service(entity);
    entities.push(newFight);
  }
  return entities;
};
