import { Module } from '@nestjs/common';
import { Repository } from './database.repository';
import { Reflector } from '@nestjs/core';
import { DatabaseService } from './database.service';

@Module({
  imports: [],
  providers: [DatabaseService, Reflector, Repository],
  exports: [DatabaseService, Repository],
})
export class DatabaseModule {}
