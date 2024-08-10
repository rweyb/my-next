import prisma from '@lib/prisma';

// キーワードに基づいて書籍を検索する非同期関数
export async function searchBooksByKeyword(keyword) {
  try {
    const books = await prisma.book.findMany({
      where: {
        title: {
          contains: keyword,
          mode: 'insensitive'
        }
      }
    });
    return books;
  } catch (error) {
    console.error('Error searching books:', error);
    return [];
  }
}
