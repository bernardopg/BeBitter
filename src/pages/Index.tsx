import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Instagram, Mail, MapPin, Calendar, Code, Camera, ExternalLink } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <div className="mb-8">
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

        {/* Projects Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Work</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Development Projects
                </CardTitle>
                <CardDescription>
                  Explore my coding projects and open source contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  From web applications to automation scripts, discover the projects 
                  I've been working on and contributing to the developer community.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <a href="https://github.com/bernardopg" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Photography Portfolio
                </CardTitle>
                <CardDescription>
                  Visual stories captured through my lens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  From street photography to landscapes, explore my visual journey 
                  and the stories I tell through photography.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <a href="https://instagram.com/be.pgomes" target="_blank" rel="noopener noreferrer">
                    <Instagram className="mr-2 h-4 w-4" />
                    View Portfolio
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>Let's Collaborate</CardTitle>
                <CardDescription>
                  Ready to work on something amazing together?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  I'm always open to discussing new projects, creative ideas, 
                  or opportunities to be part of your vision.
                </p>
                <Button asChild className="w-full">
                  <a href="mailto:bernardopg@outlook.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Get In Touch
                  </a>
                </Button>
              </CardContent>
            </Card>
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
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Backend & Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Node.js</Badge>
                      <Badge variant="outline">Python</Badge>
                      <Badge variant="outline">Git</Badge>
                      <Badge variant="outline">APIs</Badge>
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
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Design & Visual Arts</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">UI/UX Design</Badge>
                      <Badge variant="outline">Visual Storytelling</Badge>
                      <Badge variant="outline">Creative Direction</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;