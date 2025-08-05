import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Instagram, Mail, MapPin, Calendar, Code, ExternalLink, Clock, MessageCircle, Laptop, Star, Users, Coffee } from "lucide-react";
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
      title: "Web Development Tools",
      description: "Collection of utility scripts and tools for web development workflow optimization.",
      technologies: ["Node.js", "Python", "Automation", "Javascript"],
      githubUrl: "https://github.com/bernardopg"
    },
    {
      title: "Open Source Contributions",
      description: "Various contributions to open source projects and community-driven development initiatives.",
      technologies: ["JavaScript", "Python", "TypeScript", "React", "Node.js"],
      githubUrl: "https://github.com/bernardopg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-primary/20">
              <img 
                src="https://avatars.githubusercontent.com/u/69475128?v=4" 
                alt="Bernardo Gomes"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Bernardo Gomes
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-2">
              Full Stack Developer
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Brazil</span>
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
          <h2 className="text-3xl font-bold mb-12 text-center">About Me</h2>
          
          {/* Main About Content */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Text Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Sou um desenvolvedor apaixonado por tecnologia, sempre em busca de criar 
                  experiências digitais únicas e memoráveis. Com experiência em desenvolvimento web 
                  full-stack, combino habilidades técnicas com visão inovadora.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Quando não estou programando, gosto de explorar novas tecnologias, contribuir para 
                  projetos open source e compartilhar conhecimento com a comunidade de desenvolvedores.
                </p>
              </div>
              
              {/* Core Skills */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Core Expertise</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                    <Code className="h-5 w-5 text-primary" />
                    <span className="font-medium">Full Stack Development</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                    <Laptop className="h-5 w-5 text-primary" />
                    <span className="font-medium">Web Applications</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats & Quick Info */}
            <div className="space-y-6">
              {/* Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm">Experience</span>
                    </div>
                    <span className="font-bold text-primary">3+ Years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      <span className="text-sm">Projects</span>
                    </div>
                    <span className="font-bold text-primary">50+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4 text-primary" />
                      <span className="text-sm">Commits</span>
                    </div>
                    <span className="font-bold text-primary">100+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coffee className="h-4 w-4 text-primary" />
                      <span className="text-sm">Coffee Cups</span>
                    </div>
                    <span className="font-bold text-primary">∞</span>
                  </div>
                </CardContent>
              </Card>

              {/* Current Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Available for projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Based in Brazil</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Open to collaboration</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">Tech Stack</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="text-sm py-1 px-3">JavaScript</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">TypeScript</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">React</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">Node.js</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">Python</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">Git</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">Tailwind CSS</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">Next.js</Badge>
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

        {/* Skills & Technologies */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Frontend Development</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Core Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">TypeScript</Badge>
                      <Badge variant="outline">JavaScript</Badge>
                      <Badge variant="outline">HTML/CSS</Badge>
                      <Badge variant="outline">Tailwind CSS</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Tools & Frameworks</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Vite</Badge>
                      <Badge variant="outline">Next.js</Badge>
                      <Badge variant="outline">Responsive Design</Badge>
                      <Badge variant="outline">Component Libraries</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backend & Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Backend Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Node.js</Badge>
                      <Badge variant="outline">Python</Badge>
                      <Badge variant="outline">APIs</Badge>
                      <Badge variant="outline">Database</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Development Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Git</Badge>
                      <Badge variant="outline">VS Code</Badge>
                      <Badge variant="outline">Terminal</Badge>
                      <Badge variant="outline">Package Managers</Badge>
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
                    I'm always excited to discuss new projects, development opportunities, or collaborate on interesting ideas.
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