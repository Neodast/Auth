import { Module } from '@nestjs/common';
import { Repository } from './database.repository';
import { databaseProvider } from './database.provider';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [],
  providers: [databaseProvider, Reflector, Repository],
  exports: [databaseProvider, Repository],
})
export class DatabaseModule {}
