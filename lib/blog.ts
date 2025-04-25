import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface BlogFrontmatter {
  title: string;
  date: string;
  description: string;
  categories: string[];
  image?: string;
}

export interface BlogPost {
  slug: string;
  content: string;
  frontmatter: BlogFrontmatter;
  readingTime: string;
}

const blogsDirectory = path.join(process.cwd(), "content/blog");

export async function getAllBlogs(): Promise<BlogPost[]> {
  // Check if directory exists, if not create it with sample posts
  if (!fs.existsSync(blogsDirectory)) {
    fs.mkdirSync(path.join(process.cwd(), "content"), { recursive: true });
    fs.mkdirSync(blogsDirectory, { recursive: true });
    createSamplePosts();
  }

  const filenames = fs.readdirSync(blogsDirectory);
  const allBlogsData = filenames
    .filter((filename) => filename.endsWith(".mdx") || filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const fullPath = path.join(blogsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      
      const readingTimeResult = readingTime(content);
      
      return {
        slug,
        content,
        frontmatter: data as BlogFrontmatter,
        readingTime: Math.ceil(readingTimeResult.minutes).toString(),
      };
    });
    
  // Sort posts by date
  return allBlogsData.sort((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    // Check if directory exists, if not create it with sample posts
    if (!fs.existsSync(blogsDirectory)) {
      fs.mkdirSync(path.join(process.cwd(), "content"), { recursive: true });
      fs.mkdirSync(blogsDirectory, { recursive: true });
      createSamplePosts();
    }
    
    const fullPath = path.join(blogsDirectory, `${slug}.mdx`);
    const mdPath = path.join(blogsDirectory, `${slug}.md`);
    
    let filePath = "";
    if (fs.existsSync(fullPath)) {
      filePath = fullPath;
    } else if (fs.existsSync(mdPath)) {
      filePath = mdPath;
    } else {
      return undefined;
    }
    
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    
    const readingTimeResult = readingTime(content);
    
    return {
      slug,
      content,
      frontmatter: data as BlogFrontmatter,
      readingTime: Math.ceil(readingTimeResult.minutes).toString(),
    };
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return undefined;
  }
}

function createSamplePosts() {
  const samplePosts = [
    {
      filename: "getting-started-with-react.mdx",
      frontmatter: {
        title: "Getting Started with React",
        date: "2023-04-15",
        description: "Learn the fundamentals of React and how to create your first component.",
        categories: ["React", "Web Development"],
      },
      content: `
# Getting Started with React

React is a popular JavaScript library for building user interfaces, particularly single-page applications where you need a responsive UI.

## Why React?

- **Component-Based Architecture**: Build encapsulated components that manage their own state, then compose them to make complex UIs.
- **Declarative Views**: React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
- **Learn Once, Write Anywhere**: You can develop new features in React without rewriting existing code. React can also render on the server using Node and power mobile apps using React Native.

## Creating Your First Component

Here's a simple React component:

\`\`\`jsx
import React from 'react';

function HelloWorld() {
  return (
    <div>
      <h1>Hello, world!</h1>
      <p>Welcome to my first React component.</p>
    </div>
  );
}

export default HelloWorld;
\`\`\`

## Setting Up Your Development Environment

1. Install Node.js and npm
2. Create a new React app with Create React App:
   \`\`\`bash
   npx create-react-app my-app
   cd my-app
   npm start
   \`\`\`

Start building your components and enjoy the React ecosystem!
      `,
    },
    {
      filename: "mastering-tailwind-css.mdx",
      frontmatter: {
        title: "Mastering Tailwind CSS",
        date: "2023-05-20",
        description: "Learn how to create beautiful, responsive designs with Tailwind CSS utility-first approach.",
        categories: ["CSS", "Web Design"],
      },
      content: `
# Mastering Tailwind CSS

Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. Let's explore how to make the most of it.

## Why Tailwind?

- **Utility-First**: Build complex components from a constrained set of primitive utilities
- **Responsive Design**: Easily create responsive layouts with intuitive breakpoint prefixes
- **Customization**: Tailor the framework to your design system with simple configuration

## Basic Usage

Here's a simple example of a card component using Tailwind CSS:

\`\`\`html
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
  <div class="md:flex">
    <div class="md:shrink-0">
      <img class="h-48 w-full object-cover md:h-full md:w-48" src="/img/card-image.jpg" alt="Modern building architecture">
    </div>
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div>
      <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible accommodation for your team</a>
      <p class="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine?</p>
    </div>
  </div>
</div>
\`\`\`

## Advanced Techniques

### Custom Utilities

You can extend Tailwind with your own utilities:

\`\`\`js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      }
    }
  }
}
\`\`\`

### Component Extraction

For repeating patterns, consider extracting components:

\`\`\`jsx
function Button({ children, primary }) {
  const baseClasses = "font-bold py-2 px-4 rounded";
  const variantClasses = primary 
    ? "bg-blue-500 hover:bg-blue-700 text-white" 
    : "bg-gray-200 hover:bg-gray-300 text-gray-800";
    
  return (
    <button className={\`\${baseClasses} \${variantClasses}\`}>
      {children}
    </button>
  );
}
\`\`\`

Start building beautiful interfaces with Tailwind CSS!
      `,
    },
    {
      filename: "nextjs-13-app-router.mdx",
      frontmatter: {
        title: "Next.js 13 App Router: A Complete Guide",
        date: "2023-06-30",
        description: "Explore the new App Router in Next.js 13 and learn how to leverage its powerful features.",
        categories: ["Next.js", "React", "Web Development"],
      },
      content: `
# Next.js 13 App Router: A Complete Guide

Next.js 13 introduced a new App Router built on React Server Components. Let's dive into how it works and its benefits.

## The App Directory

The new \`app\` directory works alongside the \`pages\` directory and takes priority over conflicting routes:

\`\`\`
my-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── about/
│       └── page.tsx
├── pages/
│   ├── _app.tsx
│   ├── index.tsx
│   └── about.tsx
\`\`\`

## Server Components by Default

Components inside the app directory are React Server Components by default, which offer several advantages:

- **Reduced Client-Side JavaScript**: Send less code to the client
- **Direct Backend Access**: Query databases and APIs without an API layer
- **Automatic Code Splitting**: Improved performance without manual work

## Client Components When Needed

When you need interactivity, just add the "use client" directive:

\`\`\`jsx
"use client";

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

## Layouts and Nested Layouts

Layouts in Next.js 13 allow you to share UI between routes:

\`\`\`jsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>My Website</header>
        <main>{children}</main>
        <footer>© 2023</footer>
      </body>
    </html>
  );
}
\`\`\`

## Data Fetching

Server Components can fetch data directly:

\`\`\`jsx
// app/users/page.tsx
async function getUsers() {
  const res = await fetch('https://api.example.com/users');
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

The App Router in Next.js 13 represents a significant improvement in building React applications with a more intuitive mental model and better performance characteristics.
      `,
    },
  ];

  for (const post of samplePosts) {
    const { filename, frontmatter, content } = post;
    const fileContent = matter.stringify(content, frontmatter);
    fs.writeFileSync(path.join(blogsDirectory, filename), fileContent);
  }
}