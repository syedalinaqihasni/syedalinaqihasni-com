import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBlogs, getBlogBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ChevronLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.frontmatter.title} | Syed Ali Naqi Hasni`,
    description: post.frontmatter.description,
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container py-32 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost" 
          className="mb-8 flex items-center"
          asChild
        >
          <Link href="/blog">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to all posts
          </Link>
        </Button>

        <div className="space-y-2 mb-6">
          <div className="flex flex-wrap gap-2">
            {post.frontmatter.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {post.frontmatter.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <time dateTime={post.frontmatter.date}>
                {formatDate(post.frontmatter.date)}
              </time>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </div>
  );
}