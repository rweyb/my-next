import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { OwnedBooksState } from '@state/OwnedBooksState';
import { fetchOwnedBooks } from './api/ownedBooksApi';
import { searchBooksByKeyword } from '@api/searchBooksApi'; // キーワード検索用の関数をインポート
import { TextField, Button } from '@mui/material';

const Bookshelf = () => {
  // Recoil の状態とセット関数を取得
  const [ownedBooks, setOwnedBooks] = useRecoilState(OwnedBooksState);
  // 検索クエリと検索結果の状態を追加
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const loadOwnedBooks = async () => {
      try {
        // ユーザー ID を取得する方法に応じて変更
        const userId = 'current-user-id'; // 実際のユーザーIDに置き換える
        // API を呼び出して持っている本のデータを取得
        const books = await fetchOwnedBooks(userId);
        // 取得した本のデータを Recoil の状態に保存
        setOwnedBooks(books);
      } catch (error) {
        console.error('Error fetching owned books:', error); // エラーハンドリング
      }
    };
    // コンポーネントがマウントされた時に本のデータをロード
    loadOwnedBooks();
  }, [setOwnedBooks]);

  // 検索処理
  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const results = await searchBooksByKeyword(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching books:', error);
        setSearchResults([]);
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">本棚</h1>
      <ul>
        {ownedBooks.length > 0 ? (
          ownedBooks.map(book => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>著者: {book.author}</p>
              <p>出版社: {book.publisher}</p>
              {/* ここでその他の書籍情報を表示 */}
            </li>
          ))
        ) : (
          <p>本がありません。</p> // 本がない場合の表示
        )}
      </ul>
    </div>
  );
};

export default Bookshelf;