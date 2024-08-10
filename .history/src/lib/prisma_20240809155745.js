import { PrismaClient } from '@prisma/client';

// グローバル変数を使って PrismaClient インスタンスを管理
let prisma;

// 本番環境では毎回新しい PrismaClient インスタンスを作成
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // 開発環境ではグローバル変数に PrismaClient インスタンスを保持
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
