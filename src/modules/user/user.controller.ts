import { UserEntity } from '@app/modules/user/entities/user.entity';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/modules/user/user.service';
import {
  CreateUserDTO,
  LoginUserDTO,
  UpdateUserDTO,
} from '@app/modules/user/dto';
import {
  UsersResponseInterface,
  UserResponseInterface,
  LoginResponseInterface,
} from '@app/modules/user/types';
import { User } from '@app/modules/user/decorators/user.decorator';
import { AuthGuard } from '@app/guards/auth.guard';

@Controller('api')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async createUser(
    @Body('user') createUserDTO: CreateUserDTO,
  ): Promise<LoginResponseInterface> {
    const user = await this.userService.createUser(createUserDTO);
    return this.userService.buildLoginResponse(user);
  }

  @Post('login')
  async loginUser(
    @Body('user') loginUserDTO: LoginUserDTO,
  ): Promise<LoginResponseInterface> {
    const user = await this.userService.loginUser(loginUserDTO);
    return this.userService.buildLoginResponse(user);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getCurrentUser(
    @User() user: UserEntity,
  ): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Get('users')
  @UseGuards(AuthGuard)
  async getUsers(
    @Query('name') userName?: string,
    @Query('limit', new DefaultValuePipe(5)) limit?: number,
    @Query('page', new DefaultValuePipe(1)) page?: number,
  ): Promise<UsersResponseInterface> {
    return await this.userService.getUsers(userName, limit, page - 1);
  }

  @Get('user/:id')
  @UseGuards(AuthGuard)
  async getOneUser(@Param('id') id: string): Promise<UserResponseInterface> {
    const user = await this.userService.findUserById(id);
    return this.userService.buildUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') id: string,
    @Body('user') updateUserDTO: UpdateUserDTO,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(id, updateUserDTO);
    return this.userService.buildUserResponse(user);
  }

  @Delete('user/:id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: string): Promise<UserResponseInterface> {
    const user = await this.userService.deleteUser(id);
    return this.userService.buildUserResponse(user);
  }
}
