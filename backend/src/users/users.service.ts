import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOne(username: string) {
        return this.prisma.user.findUnique({
            where: { username },
        });
    }

    async create(data: Prisma.UserCreateInput) {
        const existing = await this.findOne(data.username);
        if (existing) {
            throw new ConflictException('Username already exists');
        }

        const salt = await bcrypt.genSalt();
        const password_hash = await bcrypt.hash(data.password_hash, salt);

        return this.prisma.user.create({
            data: {
                ...data,
                password_hash,
            },
        });
    }
}
