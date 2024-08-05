"use client";

import React, { useState, useEffect } from "react";
import LinkedBookDetails from "./LinkedBookDetails";
import { useRecoilValue } from 'recoil';
import { signInUserState } from "@state/signInUserState";
export default function ReviewsList({ reviews }) {
    // サインインユーザーの取得
    const signInUser = useRecoilValue(signInUserState);
    // レビューの状態を管理
    const [filteredReviews, setFilteredReviews] = useState(reviews);
    // フィルタリング状態 ('all', 'mine', 'others')
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        async function fetchReviews() {
            if (!signInUser?.uid) {
                console.error('User is not signed in');
                return;
            }

            let url = '/api/review'; // デフォルトのURL
            const params = new URLSearchParams();

            if (filter === 'mine') {
                params.append('userId', signInUser.uid); // 自分のレビューを取得
            } else if (filter === 'others') {
                params.append('filter', 'others'); // 他の人のレビューを取得
                params.append('userId', signInUser.uid);
            }

            try {
                const response = await fetch(`${url}?${params.toString()}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setFilteredReviews(data); // フィルタリングされたレビューの状態を更新
                } else {
                    console.error('Invalid data format:', data);
                }
            } catch (error) {
                console.error('Failed to fetch reviews:', error); // エラーハンドリング
            }
        }
        fetchReviews(); // レビューのフェッチ
    }, [filter, signInUser?.uid]); // フィルタリング状態またはユーザーIDが変わった場合に実行

    return (
        <div>
            {/* フィルタリングボタン */}
            <div>
                <button onClick={() => setFilter('all')}>全て</button>
                <button onClick={() => setFilter('mine')}>自分の投稿</button>
                <button onClick={() => setFilter('others')}>他の人の投稿</button>
            </div>
            {/* レビューがない場合のメッセージ */}
            {filteredReviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                // レビューのリストを表示
                filteredReviews.map((review, index) => (
                    <LinkedBookDetails book={review} index={index + 1} key={review.id} />
                ))
            )}
        </div>
    );
}