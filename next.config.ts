import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true }
};

const securityHeaders = [
	  { key: 'X-DNS-Prefetch-Control', value: 'on' },
	    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
	      { key: 'X-Frame-Options', value: 'DENY' },
	        { key: 'X-Content-Type-Options', value: 'nosniff' },
		  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
		    { key: 'Permissions-Policy', value: 'geolocation=self' },
		      { key: 'X-XSS-Protection', value: '1; mode=block' },
		        { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';" }
];

const nextConfig = {
	  reactStrictMode: true,
	    poweredByHeader: false,
	      async headers() {
		          return [{ source: '/:path*', headers: securityHeaders }];
			    }
};

export default nextConfig
;
