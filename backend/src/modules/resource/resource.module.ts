import { HttpModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ResourceController } from './resource.controller'
import { Resource } from './resource.entity'
import { ResourceService } from './resource.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Resource]),
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
