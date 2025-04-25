"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock } from "lucide-react";

// This section shows sample blog posts previews
// In a real implementation, this would fetch actual posts from the API

const previewPosts = [
  {
    slug: "getting-started-with-react",
    title: "Getting Started with React",
    description: "Learn the fundamentals of React and how to create your first component.",
    date: "2023-04-15",
    readingTime: "5",
    categories: ["React", "Web Development"],
  },
  {
    slug: "mastering-tailwind-css",
    title: "Mastering Tailwind CSS",
    description: "Learn how to create beautiful, responsive designs with Tailwind CSS utility-first approach.",
    date: "2023-05-20",
    readingTime: "7",
    categories: ["CSS", "Web Design"],
  },
  {
    slug: "nextjs-13-app-router",
    title: "Next.js 13 App Router: A Complete Guide",
    description: "Explore the new App Router in Next.js 13 and learn how to leverage its powerful features.",
    date: "2023-06-30",
    readingTime: "8",
    categories: ["Next.js", "React", "Web Development"],
  },
];

export default function BlogPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <section className="py-20 bg-background">
      <div 
        ref={ref}
        className="container px-4 md:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
        >
          <div className="space-y-2 mb-4 md:mb-0">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest Articles</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              Thoughts, tutorials, and insights about web development and design.
            </p>
          </div>
          <Link href="/blog">
            <Button variant="outline" className="flex items-center gap-1">
              <span>View All Posts</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.categories.slice(0, 2).map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow pb-2">
                    <p className="text-muted-foreground line-clamp-3">
                      {post.description}
                    </p>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      <time dateTime={post.date}>
                        {formatDate(post.date)}
                      </time>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{post.readingTime} min read</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}