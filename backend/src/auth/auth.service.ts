import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtLoginInformation } from '../shared/dtos/jwt-login-information.dto';
import { UsersService } from '../database/users/users.service';
import { UserPasswordChangeDto } from '../shared/dtos/user-password-change.dto';

@Injectable()
export class AuthService {
  private hashRounds = 10;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getByName(username);
    if (!user) {
      return null;
    }

    const isMatch = await this.comparePassword(password, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async login(user: any) {
    const payload = {
      userName: user.userName,
      id: user.id,
      roles: user.roles,
    };

    const loginInformation = new JwtLoginInformation();

    loginInformation.access_token = this.jwtService.sign(payload);
    loginInformation.userName = user.userName;
    loginInformation.id = user.id;
    loginInformation.roles = user.roles;

    return loginInformation;
  }

  public async updatePassword(dto: UserPasswordChangeDto, @Request() req) {
    if (dto.userId != req.user.id) {
      const errorMessage =
        'not allowed to change user password with user id ' + req.user.id;
      throw new HttpException(errorMessage, HttpStatus.FORBIDDEN);
    }

    const user = await this.usersService.getById(dto.userId);
    if (user == null) {
      const errorMessage = 'user id ' + req.user.id + ' not found';
      throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
    }

    const isMatch = await this.comparePassword(dto.oldPassword, user.password);
    if (!isMatch) {
      const errorMessage =
        'old password of user with id ' + req.user.id + " doesn't match";
      throw new HttpException(errorMessage, HttpStatus.FORBIDDEN);
    }

    const newHashedPassword = await this.hashPassword(dto.newPassword);
    return await this.usersService.updatePassword(
      dto.userId,
      newHashedPassword,
    );
  }

  public async hashPassword(password: string) {
    return await bcrypt.hash(password, this.hashRounds);
  }

  public async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
