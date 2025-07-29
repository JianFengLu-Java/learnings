import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma'; // 请确保路径正确
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
    const prisma = new PrismaClient();
    const session = await getServerSession(authOptions);
    if (!session?.user?.name) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUserId = session.user.name;
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.trim();

    if (!query) {
        return NextResponse.json([], { status: 200 });
    }

    const users = await prisma.user.findMany({
        where: {
            AND: [
                {
                    OR: [
                        { name: { contains: query} },
                        { email: { contains: query} },
                    ],
                },
                {
                    name: { not: currentUserId }, // 不返回自己
                },
            ],
        },
        select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
        },
        take: 10,
    });

    return NextResponse.json(users);
}