import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllBlogs } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { Clock, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Syed Ali Naqi Hasni",
  description: "Read my latest thoughts, tutorials, and insights about web development, frontend technologies, and design.",
};

export default async function BlogPage() {
  const posts = await getAllBlogs();
  
  // Get unique categories
  const categories = Array.from(
    new Set(posts.flatMap((post) => post.frontmatter.categories))
  );
  
  return (
    <div className="container py-32 px-4 md:px-6">
      <div className="space-y-2 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Blog</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
          My thoughts, tutorials, and insights about web development, frontend technologies, and design.
        </p>
      </div>
      
      <Tabs defaultValue="all" className="mb-8">
        <div className="flex justify-center">
          <TabsList className="bg-muted/60">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.frontmatter.categories.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="line-clamp-2">{post.frontmatter.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow pb-2">
                    <p className="text-muted-foreground line-clamp-3">
                      {post.frontmatter.description}
                    </p>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts
                .filter((post) => 
                  post.frontmatter.categories.includes(category)
                )
                .map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {post.frontmatter.categories.map((cat) => (
                            <Badge key={cat} variant="secondary">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                        <CardTitle className="line-clamp-2">{post.frontmatter.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow pb-2">
                        <p className="text-muted-foreground line-clamp-3">
                          {post.frontmatter.description}
                        </p>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}