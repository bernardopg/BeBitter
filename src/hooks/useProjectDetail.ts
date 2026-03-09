import { CONFIG } from "@/constants/config";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";

export interface ProjectDetail {
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  language: string | null;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  defaultBranch: string;
  license: string | null;
  readme: string | null;
}

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  default_branch: string;
  license: { name: string } | null;
}

const buildHeaders = (extra?: Record<string, string>): HeadersInit => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "X-GitHub-Api-Version": "2022-11-28",
    ...extra,
  };
};

/**
 * O GitHub HTML renderer devolve URLs **relativas** para imagens e links
 * quando o README usa caminhos locais (ex: `./public/img.png`).
 * Quando o HTML é embutido em `localhost/projects/BeBitter`, o browser
 * resolve esses caminhos relativamente à nossa URL, não ao repo do GitHub.
 *
 * Esta função converte todos os src/href relativos para URLs absolutas:
 *   - Imagens → raw.githubusercontent.com/{user}/{repo}/{branch}/path
 *   - Links   → github.com/{user}/{repo}/blob/{branch}/path
 */
const resolveReadmeUrls = (
  html: string,
  username: string,
  repo: string,
  branch: string
): string => {
  const rawBase = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/`;
  const blobBase = `https://github.com/${username}/${repo}/blob/${branch}/`;

  // Imagens: src relativo → raw.githubusercontent.com
  const withImages = html.replace(
    /(<img\b[^>]*?\bsrc=)(["'])(?!https?:\/\/|\/\/|data:|#)([^"']*)\2/gi,
    (_match, tag, q, src) =>
      `${tag}${q}${rawBase}${src.replace(/^\.\//, "")}${q}`
  );

  // Links: href relativo (não âncora, não mailto, não absoluto) → github.com blob
  const withLinks = withImages.replace(
    /(<a\b[^>]*?\bhref=)(["'])(?!https?:\/\/|\/\/|#|mailto:)([^"']*)\2/gi,
    (_match, tag, q, href) =>
      `${tag}${q}${blobBase}${href.replace(/^\.\//, "")}${q}`
  );

  // Sanitiza o HTML final para evitar XSS antes de enviar para o frontend.
  return DOMPurify.sanitize(withLinks);
};

const fetchProjectDetail = async (slug: string): Promise<ProjectDetail> => {
  const base = CONFIG.GITHUB_API_BASE;
  const username = CONFIG.GITHUB_USERNAME;

  const [repoRes, readmeRes] = await Promise.allSettled([
    fetch(`${base}/repos/${username}/${slug}`, {
      headers: buildHeaders(),
      signal: AbortSignal.timeout(10_000),
    }),
    // Pede o README renderizado como HTML pelo GitHub (emojis convertidos,
    // código destacado). URLs relativas são corrigidas depois com resolveReadmeUrls.
    fetch(`${base}/repos/${username}/${slug}/readme`, {
      headers: buildHeaders({ Accept: "application/vnd.github.html" }),
      signal: AbortSignal.timeout(10_000),
    }),
  ]);

  if (repoRes.status === "rejected") {
    throw new Error(`Failed to fetch repository: ${slug}`);
  }

  const repoResponse = repoRes.value;
  if (!repoResponse.ok) {
    if (repoResponse.status === 404) {
      throw new Error(`Repository not found: ${slug}`);
    }
    throw new Error(`GitHub API error: ${repoResponse.status}`);
  }

  const repo: GitHubRepo = await repoResponse.json();

  let readme: string | null = null;
  if (readmeRes.status === "fulfilled" && readmeRes.value.ok) {
    const rawHtml = await readmeRes.value.text();
    // Resolve URLs relativas usando o branch padrão do repo
    readme = resolveReadmeUrls(rawHtml, username, slug, repo.default_branch);
  }

  return {
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description,
    htmlUrl: repo.html_url,
    homepage: repo.homepage || null,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    openIssues: repo.open_issues_count,
    language: repo.language,
    topics: repo.topics ?? [],
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    defaultBranch: repo.default_branch,
    license: repo.license?.name ?? null,
    readme,
  };
};

export const useProjectDetail = (slug: string) => {
  return useQuery({
    queryKey: ["project-detail", slug],
    queryFn: () => fetchProjectDetail(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
    retry: 0,
  });
};
