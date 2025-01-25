import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      domains: ['thumbs.dreamstime.com', 'media-cdn.tripadvisor.com', 'dynamic-media-cdn.tripadvisor.com'],
    },
    async redirects() {
      return [];
    },
  };
 
export default withNextIntl(nextConfig);