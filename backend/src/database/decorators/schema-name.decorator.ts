import { SetMetadata } from '@nestjs/common';

export const ENTITY_NAME = 'entityName';

export const EntityName = (name: string) => SetMetadata(ENTITY_NAME, name);
