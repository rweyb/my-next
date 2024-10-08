'use client';

import { addReview, removeReview } from '@/lib/actions';
import { useAuth } from '@/context/AuthContext';

export default function FormEdit({ src: { id, read, memo } }) {

    //現在のユーザーを取得
    const { user } = useAuth();
    console.log('Auth Context in FormEdit:', authContext);

    //フォームのサブミットハンドラー
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append('userId', user?.uid); //ユーザーIDを追加

        try {
            await addReview(formData); //レビュー追加
            console.log('Review added successfully');
        } catch (error) {
            console.error('Failed to add review:', error);
        }
    };

    return (
        //サブミット時にaddReviewメソッドを呼び出し
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" defaultValue={id} />
            <div className="mb-3">
                <label className="font-bold" htmlFor="read">読了日 :</label>
                <input type="date" id="read" name="read"
                    className="block bg-gray-100 border-2 border-gray-600 rounded focus:bg-white
                    focus:outline-none focus:border-red-500"
                    defaultValue={read} />
            </div>

            <div className="mb-3">
                <label className="font-bold" htmlFor="memo">感想 :</label>
                <textarea id="memo" name="memo" rows="3"
                    className="block bg-gray-100 border-2 border-gray-600 w-full rounded
                    focus:bg-white focus:outline-none focus:border-red-500"
                    defaultValue={memo}></textarea>
            </div>

            <button type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 mr-2 hover:bg-blue-500">
                登録</button>

            {/*[削除]ボタンでremoveReview関数を呼び出し */}
            <button type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-500"
                formAction={removeReview}>
                削除</button>
        </form>
    );
}