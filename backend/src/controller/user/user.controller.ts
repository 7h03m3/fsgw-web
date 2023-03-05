import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from 'src/shared/enums/user-role.enum';
import { UserRoles } from '../../shared/decorators/user-roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth/role-auth.guard';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../database/users/users.service';
import { UserEntity } from '../../database/users/user.entity';
import { UserDto } from '../../shared/dtos/user.dto';
import { UserPasswordChangeDto } from '../../shared/dtos/user-password-change.dto';
import { LocalAuthGuard } from '../../auth/guards/local-auth/local-auth.guard';

@Controller('user/')
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private authService: AuthService,
  ) {}

  @UserRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }

  @UserRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get(':id')
  getById(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.getById(id);
  }

  @UserRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async create(@Body() dto: UserDto): Promise<UserEntity> {
    dto.password = await this.authService.hashPassword(dto.password);
    return this.userService.create(dto);
  }

  @UserRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async update(@Body() dto: UserDto): Promise<any> {
    if (dto.password && dto.password != '') {
      const hashedPassword = await this.authService.hashPassword(dto.password);
      await this.userService.updatePassword(dto.id, hashedPassword);
    }

    return this.userService.update(dto);
  }

  @UserRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.userService.delete(id);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('password')
  async updatePassword(
    @Body() dto: UserPasswordChangeDto,
    @Request() req,
  ): Promise<UserEntity> {
    return this.authService.updatePassword(dto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile ')
  getProfile(@Request() req) {
    return req.user;
  }
}
