import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() authDto: AuthDto) {
        return this.authService.register(authDto.username, authDto.password);
    }

    @Post('login')
    async login(@Body() authDto: AuthDto) {
        const user = await this.authService.validateUser(authDto.username, authDto.password);
        if (!user) {
            return { message: 'Invalid credentials' }; // Or throw UnauthorizedException
        }
        return this.authService.login(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}
