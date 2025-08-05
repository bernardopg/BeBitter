import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Instagram, Mail, MapPin, Calendar, Code, Camera, ExternalLink, User, Clock, MessageCircle } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import ProjectCard from "@/components/ProjectCard";
import Timeline from "@/components/Timeline";
import ContactForm from "@/components/ContactForm";

const Index = () => {
  const featuredProjects = [
    {
      title: "Personal Portfolio Website",
      description: "Modern, responsive portfolio built with React and TypeScript, featuring clean design and smooth animations.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      githubUrl: "https://github.com/bernardopg",
      featured: true
    },
    {
      title: "Photography Gallery",
      description: "Interactive photo gallery showcasing street photography and landscapes with responsive grid layout.",
      technologies: ["JavaScript", "CSS Grid", "Lightbox"],
      githubUrl: "https://github.com/bernardopg",
      liveUrl: "https://instagram.com/be.pgomes"
    },
    {
      title: "Web Development Tools",
      description: "Collection of utility scripts and tools for web development workflow optimization.",
      technologies: ["Node.js", "Python", "Automation"],
      githubUrl: "https://github.com/bernardopg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
              <User className="h-16 w-16 text-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Bernardo Gomes
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-2">
              Full Stack Developer & Photography Enthusiast
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Portugal</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Available for projects</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button asChild size="lg">
              <a href="https://github.com/bernardopg" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://instagram.com/be.pgomes" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-5 w-5" />
                Instagram
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="mailto:bernardopg@outlook.com">
                <Mail className="mr-2 h-5 w-5" />
                Contact
              </a>
            </Button>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sou um desenvolvedor apaixonado por tecnologia e fotografia, sempre em busca de criar 
                experiências digitais únicas e memoráveis. Com experiência em desenvolvimento web 
                full-stack, combino habilidades técnicas com visão criativa.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Quando não estou programando, você me encontrará explorando o mundo através das lentes 
                da minha câmera, capturando momentos e histórias que merecem ser contadas.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">3+</div>
                  <div className="text-sm text-muted-foreground">Years Coding</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1K+</div>
                  <div className="text-sm text-muted-foreground">Photos Taken</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Code className="h-5 w-5 text-primary" />
                <span className="font-medium">Full Stack Development</span>
              </div>
              <div className="flex items-center gap-3">
                <Camera className="h-5 w-5 text-primary" />
                <span className="font-medium">Photography & Visual Arts</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary">JavaScript</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Node.js</Badge>
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">Photography</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
          <div className="text-center">
            <Button asChild variant="outline">
              <a href="https://github.com/bernardopg" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View All Projects
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
            <Clock className="h-6 w-6" />
            My Journey
          </h2>
          <div className="max-w-3xl mx-auto">
            <Timeline />
          </div>
        </section>

        {/* Skills & Interests */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Skills & Interests</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Frontend Development</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">TypeScript</Badge>
                      <Badge variant="outline">JavaScript</Badge>
                      <Badge variant="outline">HTML/CSS</Badge>
                      <Badge variant="outline">Tailwind CSS</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Backend & Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Node.js</Badge>
                      <Badge variant="outline">Python</Badge>
                      <Badge variant="outline">Git</Badge>
                      <Badge variant="outline">APIs</Badge>
                      <Badge variant="outline">Database</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Creative Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Photography</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Street Photography</Badge>
                      <Badge variant="outline">Portraits</Badge>
                      <Badge variant="outline">Landscapes</Badge>
                      <Badge variant="outline">Urban Exploration</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Design & Visual Arts</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">UI/UX Design</Badge>
                      <Badge variant="outline">Visual Storytelling</Badge>
                      <Badge variant="outline">Creative Direction</Badge>
                      <Badge variant="outline">Photo Editing</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
            <MessageCircle className="h-6 w-6" />
            Let's Connect
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Get In Touch</CardTitle>
                  <CardDescription>
                    I'm always excited to discuss new projects, creative ideas, or opportunities to collaborate.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">bernardopg@outlook.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">GitHub</div>
                      <div className="text-sm text-muted-foreground">@bernardopg</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Instagram className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Instagram</div>
                      <div className="text-sm text-muted-foreground">@be.pgomes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <ContactForm />
          </div>
        </section>

        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;