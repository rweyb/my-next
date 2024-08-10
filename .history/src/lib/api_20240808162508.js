// APIルートのベースURL
const API_URL = '/api';

// 指定されたIDのレビュー情報を取得する関数
export async function fetchReviewById(id) {
    try {
        // APIエンドポイントにリクエストを送信し、IDに基づいたレビュー情報を取得する
        const response = await fetch(`${API_URL}/getReviewById?id=${id}`);
        
        // レスポンスが正常でない場合はエラーをスローする
        if (!response.ok) {
            throw new Error('Failed to fetch review');
        }
        
        // レスポンスをJSON形式で解析してデータを返す
        return await response.json();
    } catch (error) {
        // エラーが発生した場合は、エラーメッセージをコンソールに出力し、エラーをスローする
        console.error('Error fetching review:', error);
        throw error;
    }
}

// 全てのレビュー情報を取得する関数
export async function fetchAllReviews() {
    try {
        // APIエンドポイントにリクエストを送信し、全てのレビュー情報を取得する
        const response = await fetch(`${API_URL}/getAllReviews`);
        
        // レスポンスが正常でない場合はエラーをスローする
        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }
        
        // レスポンスをJSON形式で解析してデータを返す
        return await response.json();
    } catch (error) {
        // エラーが発生した場合は、エラーメッセージをコンソールに出力し、エラーをスローする
        console.error('Error fetching reviews:', error);
        throw error;
    }
}