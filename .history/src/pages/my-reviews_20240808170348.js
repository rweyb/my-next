"use client";

import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { signInUserState } from "@state/signInUserState";
import ReviewsList from "@/components/ReviewsList";
import { fetchAllReviews } from "@lib/api";

export const dynamic = "force-dynamic";

export default function ReviewsPage() {
  // Recoilの状態からサインインユーザーの情報を取得
  const signInUser = useRecoilValue(signInUserState);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (signInUser?.uid) {
        try {
          // APIから全てのレビューを取得
          const data = await fetchAllReviews();
          setReviews(data);
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      } else {
        console.error("User is not signed in");
      }
    };

    fetchData();
  }, [signInUser]);

  return (
    <div className="p-6 mx-auto max-w-screen-lg">
      <h1 className="text-3xl font-bold mb-6">レビュー一覧</h1>
      {signInUser?.uid ? ( // サインインしているユーザーがいる場合
        reviews.length === 0 ? ( // レビューがない場合の表示
          <p>現在、レビューはありません。</p>
        ) : (
          // レビューがある場合の表示
          <ReviewsList reviews={reviews} />
        )
      ) : (
        // サインインしていない場合
        <p>サインインしてください。</p>
      )}
    </div>
  );
}
