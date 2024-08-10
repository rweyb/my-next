import prisma from "../../lib/prisma";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // GETリクエストの場合、レビューの取得を行う
        const { userId, filter } = req.query; // クエリパラメーターからユーザーIDとフィルタ条件を取得
        try {
            if (!userId) {
                // ユーザーIDが提供されていない場合
                return res.status(400).json({ error: 'User ID is required' });
            }

            let reviews;
            if (filter === 'others') {
                // 他の人のレビューを取得する場合
                reviews = await prisma.review.findMany({
                    where: { userId: { not: userId } },
                    orderBy: { read: 'desc' }, // 読了日で降順に並べ替え
                });
            } else {
                // 自分のレビューを取得する場合
                reviews = await prisma.review.findMany({
                    where: { userId },
                    orderBy: { read: 'desc' }, // 読了日で降順に並べ替え
                });
            }

            res.status(200).json(reviews); // 取得したレビューを返す
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch reviews' }); // エラー発生時
        } finally {
            await prisma.$disconnect(); // Prismaクライアントを切断
        }
    } else {
        // GETメソッド以外のリクエストは許可しない
        res.status(405).json({ error: 'Method not allowed' });
    }
}
