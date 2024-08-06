/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'books.google.com',
                pathname: '/books/content/**',
            },
            {
                protocol: 'https',
                hostname: 'books.google.com',
                pathname: '/books/content/**',
            },
        ],
    },
};

export default nextConfig;
