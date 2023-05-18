import {
  Controller,
  Get,
  UseGuards,
  Param,
  Patch,
  Body,
  Res,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/middleware/guards/jwt-auth.guard';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response, Request } from 'express';
import { getTokenFromRequest } from 'src/utils/getTokenFromRequest';
import { decodeIdFromToken } from 'src/utils/decodeIdFromToken';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOneById(@Req() req: Request): Promise<User> {
    const id = decodeIdFromToken(getTokenFromRequest(req));
    if (!id) throw new ForbiddenException('user not found');

    const user = await this.usersService.findOneById(id);
    delete user.password;

    return user;
  }

  @Patch('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateById(
    @Body() updateData: UpdateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const id = decodeIdFromToken(getTokenFromRequest(req));
    if (!id) throw new ForbiddenException('user not found');

    const count = this.usersService.updateById(id, updateData);
    if (count)
      return res.status(HttpStatus.OK).json({
        message: 'Updated successfully',
      });

    return res.status(HttpStatus.BAD_REQUEST).json({
      message: 'Unable to update user',
    });
  }
}
