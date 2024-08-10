import { PrismaClient } from '@prisma/client';

// PrismaClientのインスタンスを作成
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // POSTリクエストの場合、新しいレビューを作成
        const { userId, content } = req.body; // リクエストボディからユーザーIDとレビュー内容を取得
        try {
            const newReview = await prisma.review.create({
                data: {
                    userId, // ユーザーID
                    content, // レビューの内容
                    createdAt: new Date(), // 現在の日時
                },
            });
            res.status(200).json(newReview); // 作成したレビューを返す
        } catch (error) {
            res.status(500).json({ error: 'Failed to create review' }); // エラー発生時
        } finally {
            await prisma.$disconnect(); // Prismaクライアントを切断
        }
    } else {
        // POSTメソッド以外のリクエストは許可しない
        res.status(405).json({ error: 'Method not allowed' });
    }
}
