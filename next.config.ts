import withAntdLess from 'next-plugin-antd-less';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
},

  reactStrictMode: false,

  images: {
    remotePatterns: [
        {
            protocol: "https",
            hostname: "api.lojaonline.eliezer.tec.br",
            pathname: "/**",
        },
    ],
},
};

export default nextConfig;
