import { PrismaClient } from '@prisma/client';

let prisma;

// 本番環境では毎回新しい PrismaClient インスタンスを作成
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // 開発環境ではグローバルインスタンスを使う
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
