import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id, userId } = req.query;

  if (id) {
    // id値をキーにレビュー情報を取得
    try {
      const review = await prisma.review.findUnique({
        where: { id: parseInt(id) },
      });
      if (review) {
        res.status(200).json(review);
      } else {
        res.status(404).json({ error: "Review not found" });
      }
    } catch (error) {
      console.error("Error fetching review by ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (userId) {
    // userIdをキーにレビュー情報を取得
    try {
      const reviews = await prisma.review.findMany({
        where: { userId: parseInt(userId) },
        orderBy: { read: "desc" },
      });
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching reviews by user ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // 全てのレビューを取得
    try {
      const reviews = await prisma.review.findMany({
        orderBy: { read: "desc" },
      });
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching all reviews:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}