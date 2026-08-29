import type { NextConfig } from 'next';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const isUserSite = repositoryName.endsWith('.github.io');
const basePath = isGitHubPages && repositoryName && !isUserSite ? `/${repositoryName}` : '';

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: 'export' as const,
        trailingSlash: true,
        basePath,
        assetPrefix: basePath || undefined,
      }
    : {}),
  images: { unoptimized: true },
};

export default nextConfig;
