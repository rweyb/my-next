import prisma from "@lib/prisma";

export default async function handler(req, res) {
    const { id } = req.query; // リクエストからレビューのIDを取得

    if (req.method === 'GET') {
        // GETリクエストの場合、指定されたIDのレビューを取得
        try {
            const review = await prisma.review.findUnique({ where: { id } });
            if (!review) {
                // レビューが見つからない場合
                return res.status(404).json({ error: 'Review not found' });
            }
            res.status(200).json(review); // レビューを返す
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch review' }); // エラー発生時
        } finally {
            await prisma.$disconnect(); // Prismaクライアントを切断
        }
    } else if (req.method === 'DELETE') {
        // DELETEリクエストの場合、指定されたIDのレビューを削除
        try {
            await prisma.review.delete({ where: { id } });
            res.status(200).json({ message: 'Review removed successfully' }); // 削除成功
        } catch (error) {
            res.status(500).json({ error: 'Failed to remove review' }); // エラー発生時
        } finally {
            await prisma.$disconnect(); // Prismaクライアントを切断
        }
    } else {
        // 他のHTTPメソッドがリクエストされた場合
        res.setHeader('Allow', ['GET', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
