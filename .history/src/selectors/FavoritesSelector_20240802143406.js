import { selectorFamily } from 'recoil';
import { FavoritesListAtom } from '../state/FavoritesListAtom';
import { atomFamily } from 'recoil';
import fetch from 'node-fetch';

// 特定のIDに基づいて本の詳細情報を取得するセレクター
export const FavoritesSelector = selectorFamily({
  key: 'FavoritesSelector', 
  get: (id) => async ({ get }) => {
    try {
      // APIから本の詳細情報を取得
      const response = await fetch(`https://example.com/api/books/${id}`);
      const data = await response.json();
      return data; // 取得したデータを返す
    } catch (error) {
      // エラーハンドリング
      console.error('Error fetching book details:', error);
      return null; // エラー時はnullを返す
    }
  },
});