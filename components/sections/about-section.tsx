"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CircleUserRound, Briefcase, GraduationCap, Award } from "lucide-react";

const skills = [
  { name: "WordPress", level: "Expert" },
  { name: "React.js", level: "Advanced" },
  { name: "Next.js", level: "Advanced" },
  { name: "JavaScript", level: "Advanced" },
  { name: "TypeScript", level: "Intermediate" },
  { name: "HTML/CSS", level: "Advanced" },
  { name: "Tailwind CSS", level: "Advanced" },
  { name: "Redux", level: "Intermediate" },
  { name: "Node.js", level: "Intermediate" },
  { name: "Express.js", level: "Intermediate" },
  { name: "MongoDB", level: "Intermediate" },
  { name: "Shopify", level: "Advanced" },
  { name: "Git/GitHub", level: "Advanced" },
  { name: "SEO (On-page & Technical)", level: "Advanced" },
  { name: "UI/UX Design", level: "Intermediate" },
  { name: "REST APIs", level: "Advanced" },
  { name: "Testing (Jest, RTL)", level: "Intermediate" },
  { name: "Responsive Design", level: "Advanced" },
  { name: "SaaS Development", level: "Intermediate" },
  { name: "Custom Software Development", level: "Intermediate" },
];

const experience = [
  {
    title: "Sr. Web Developer",
    company: "eSpark Consultants Group",

    period: "2018 - Present",
    description:
      "Handled front-end development, focusing on responsive design, SEO, and performance optimization for local and international clients.",
    achievements: [
      "Built and optimized 25+ client websites with modern, responsive designs",
      "Implemented technical SEO improvements that enhanced site rankings",
      "Streamlined development workflows using Git and staging environments",
      "Collaborated with UI/UX designers for pixel-perfect implementation",
    ],
  },
  {
    title: "Freelance WordPress Developer",
    company: "Self-Employed",
    period: "2016 - Present",
    description:
      "Provided custom WordPress development services, from theme customization to plugin development, for clients across various industries.",
    achievements: [
      "Delivered 20+ customized WordPress sites with client-specific features",
      "Created reusable theme components for faster project delivery",
      "Configured payment gateways, forms, and security enhancements",
      "Maintained long-term client relationships through ongoing support",
    ],
  },
  {
    title: "Senior Web Developer",
    company: "Remote UK-Based Company",
    period: "2019 - 2022",
    description:
      "Spearheading full-stack development projects with a strong focus on WordPress, React.js, and custom web solutions. Delivering scalable applications and ensuring high performance for diverse clients across e-commerce, SaaS, and CMS platforms.",
    achievements: [
      "Developed and maintained 30+ high-performance websites using WordPress and React.js",
      "Integrated advanced SEO strategies boosting organic traffic by up to 300%",
      "Built custom plugins and REST APIs to extend WordPress functionality",
      "Led successful Wordpress/WooCommerce migrations and tailored e-commerce solutions",
    ],
  },
];

const education = [
  {
    degree: "AI, Metaverse, and Web 3.0 Developer & Solopreneur (In Progress)",
    institution:
      "Presidential Initiative for Artificial Intelligence and Computing (PIAIC)",
    period: "2024 - 2025",
    description:
      "Focused on cutting-edge technologies including AI, Web3, Metaverse, and Cloud-Native Computing.",
  },
  {
    degree: "Associate's Degree in Computer Information Technology",
    institution: "Sindh Board of Technical Education",
    period: "2013 - 2016",
    description:
      "Covered computer hardware, networking, software development, and IT fundamentals.",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="py-20 bg-background">
      <div ref={ref} className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            About Me
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            Frontend developer with a passion for creating beautiful and
            functional web experiences.
          </p>
        </motion.div>

        <Tabs defaultValue="profile" className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <CircleUserRound className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="flex items-center gap-2"
              >
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Experience</span>
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="flex items-center gap-2"
              >
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Education</span>
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">About Me</h3>
                    <p className="text-muted-foreground">
                      {`I'm a passionate frontend developer with 6+ years of
                      experience, specializing in building modern web
                      applications with React and Next.js. I have a strong focus
                      on creating responsive, accessible, and performant user
                      interfaces.`}
                    </p>
                    <p className="text-muted-foreground mt-4">
                      {`When I'm not coding, you can find me exploring new
                      technologies, contributing to open source projects, or
                      writing technical blog posts to share my knowledge with
                      the community.`}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge
                          key={skill.name}
                          variant={
                            skill.level === "Advanced" ? "default" : "secondary"
                          }
                          className="px-3 py-1"
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              {experience.map((job, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <Badge variant="outline" className="mt-1 sm:mt-0 w-fit">
                        {job.period}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{job.company}</p>
                    <p className="mb-4">{job.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center">
                        <Award className="h-4 w-4 mr-2" />
                        Key Achievements
                      </h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-1">
                        {job.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      <Badge variant="outline" className="mt-1 sm:mt-0 w-fit">
                        {edu.period}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {edu.institution}
                    </p>
                    <p>{edu.description}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </section>
  );
}
