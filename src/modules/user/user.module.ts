import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '@app/modules/user/user.controller';
import { UserEntity } from '@app/modules/user/entities/user.entity';
import { UserService } from '@app/modules/user/user.service';
import { AuthGuard } from '@app/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
