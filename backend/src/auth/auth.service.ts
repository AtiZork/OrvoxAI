import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const admin = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const { password: _, ...result } = admin;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const admin = await this.validateUser(loginDto.email, loginDto.password);
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: admin.email, sub: admin.id };
    return {
      access_token: this.jwtService.sign(payload),
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    };
  }

  async validateToken(payload: any) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: payload.sub },
    });

    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }

    return { id: admin.id, email: admin.email, name: admin.name };
  }
}







