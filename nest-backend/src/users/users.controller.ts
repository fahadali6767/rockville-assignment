import { Body, Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/auth-guard/auth-guard.guard';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Put()
  @UseGuards(AuthGuard)
  async updateProfile(@Body() body, @Req() req: Request) {
    let user = (req as any).user;
    const bodyData: any = {
      dateOfBirth: body?.dateOfBirth,
      address: body?.address,
      name: body?.name,
    };
    if (body?.profileImage) {
      bodyData.profileImage = body.profileImage;
    }
    let updatedData = await this.userService.updateUserById(user._id, bodyData);
    return { updatedData, message: 'User updated successfully.' };
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserByID(id);
  }

  @Put('category/add')
  @UseGuards(AuthGuard)
  async addFavoriteCategory(@Body() body, @Req() req: Request) {
    let user = (req as any).user;
    let categoriesId = body.categoriesId;
    return await this.userService.addFavoriteCategory(user?._id, categoriesId);
  }
  @Put('category/remove')
  @UseGuards(AuthGuard)
  async removeFavoriteCategory(@Body() body, @Req() req: Request) {
    let user = (req as any).user;
    let categoryId = body.categoryId;
    return await this.userService.removeFavoriteCategory(
      user?._id,
      categoryId,
    );
  }
}
