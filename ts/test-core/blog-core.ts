export type BlogDirectoryPost = {
  path: string;
  publishedAt?: string;
  publishedLabel?: string;
  summary: string;
  title: string;
};

export function formatBlogDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${dateString}T00:00:00`));
}

export function sortBlogPostsNewestFirst(posts: BlogDirectoryPost[]): BlogDirectoryPost[] {
  return posts
    .map((post, index) => ({ index, post }))
    .sort((left, right) => {
      const leftTime = left.post.publishedAt
        ? new Date(`${left.post.publishedAt}T00:00:00`).getTime()
        : Number.NEGATIVE_INFINITY;
      const rightTime = right.post.publishedAt
        ? new Date(`${right.post.publishedAt}T00:00:00`).getTime()
        : Number.NEGATIVE_INFINITY;
      const dateDelta = rightTime - leftTime;

      if (dateDelta !== 0) {
        return dateDelta;
      }

      return left.index - right.index;
    })
    .map(({ post }) => post);
}

export function getBlogFilenameLabel(post: Pick<BlogDirectoryPost, "path">): string {
  const segments = post.path.split("/");
  return segments[segments.length - 1] || post.path;
}

export function normalizeBlogSearchTerm(value: string): string {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, 120);
}

export function blogMatchesSearch(post: Pick<BlogDirectoryPost, "title" | "path">, searchTerm: string): boolean {
  const normalizedSearchTerm = normalizeBlogSearchTerm(searchTerm).toLowerCase();
  if (!normalizedSearchTerm) {
    return true;
  }

  const searchHaystack = `${post.title} ${getBlogFilenameLabel(post)}`.toLowerCase();
  return searchHaystack.includes(normalizedSearchTerm);
}
