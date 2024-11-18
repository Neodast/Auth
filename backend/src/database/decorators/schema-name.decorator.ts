import { SetMetadata } from '@nestjs/common';

export const SCHEMA_NAME = 'schemaName';

export const SchemaName = (name: string) => SetMetadata(SCHEMA_NAME, name);
