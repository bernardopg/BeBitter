import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Instagram, Mail, MapPin, Calendar, Code, ExternalLink, Clock, MessageCircle, Laptop, Star, Users, Coffee, Palette, Monitor, Phone } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import ProjectCard from "@/components/ProjectCard";
import Timeline from "@/components/Timeline";
import ContactForm from "@/components/ContactForm";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  const featuredProjects = [
    {
      title: t('projects.portfolio.title'),
      description: t('projects.portfolio.description'),
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      githubUrl: "https://github.com/bernardopg",
      featured: true
    },
    {
      title: t('projects.tools.title'),
      description: t('projects.tools.description'),
      technologies: ["Node.js", "Python", "Automation", "Javascript"],
      githubUrl: "https://github.com/bernardopg"
    },
    {
      title: t('projects.design.title'),
      description: t('projects.design.description'),
      technologies: ["Figma", "UI/UX", "Responsive Design", "Prototyping"],
      githubUrl: "https://github.com/bernardopg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <LanguageToggle />
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
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-2">
              {t('hero.subtitle')}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{t('hero.location')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{t('hero.availability')}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button asChild size="lg">
              <a href="https://github.com/bernardopg" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                {t('hero.github')}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://instagram.com/be.pgomes" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-5 w-5" />
                {t('hero.instagram')}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="mailto:bernardo.gomes@bebitterbebetter.com.br">
                <Mail className="mr-2 h-5 w-5" />
                {t('hero.contact')}
              </a>
            </Button>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">{t('about.title')}</h2>
          
          {/* Main About Content */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Text Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('about.description1')}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('about.description2')}
                </p>
              </div>
              
              {/* Core Skills */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('about.expertise')}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                    <Code className="h-5 w-5 text-primary" />
                    <span className="font-medium">{t('about.fullstack')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                    <Palette className="h-5 w-5 text-primary" />
                    <span className="font-medium">{t('about.uiux')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                    <Monitor className="h-5 w-5 text-primary" />
                    <span className="font-medium">{t('about.website')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                    <Laptop className="h-5 w-5 text-primary" />
                    <span className="font-medium">{t('about.responsive')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats & Quick Info */}
            <div className="space-y-6">
              {/* Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('about.stats')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm">{t('about.experience')}</span>
                    </div>
                    <span className="font-bold text-primary">{t('about.years')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      <span className="text-sm">{t('about.projects')}</span>
                    </div>
                    <span className="font-bold text-primary">{t('about.projectsCount')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-primary" />
                      <span className="text-sm">{t('about.designs')}</span>
                    </div>
                    <span className="font-bold text-primary">{t('about.designsCount')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coffee className="h-4 w-4 text-primary" />
                      <span className="text-sm">{t('about.coffee')}</span>
                    </div>
                    <span className="font-bold text-primary">{t('about.coffeeCount')}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Current Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('about.status')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">{t('about.available')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{t('about.location')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{t('about.collaboration')}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">{t('about.techstack')}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="text-sm py-1 px-3">JavaScript</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">TypeScript</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">React</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">Node.js</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">Python</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">Figma</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">Tailwind CSS</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">Next.js</Badge>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">{t('projects.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
          <div className="text-center">
            <Button asChild variant="outline">
              <a href="https://github.com/bernardopg" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                {t('projects.viewAll')}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
            <Clock className="h-6 w-6" />
            {t('timeline.title')}
          </h2>
          <div className="max-w-3xl mx-auto">
            <Timeline />
          </div>
        </section>

        {/* Skills & Technologies */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">{t('skills.title')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('skills.development')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">{t('skills.frontend')}</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">TypeScript</Badge>
                      <Badge variant="outline">JavaScript</Badge>
                      <Badge variant="outline">HTML/CSS</Badge>
                      <Badge variant="outline">Tailwind CSS</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">{t('skills.backend')}</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Node.js</Badge>
                      <Badge variant="outline">Python</Badge>
                      <Badge variant="outline">APIs</Badge>
                      <Badge variant="outline">Git</Badge>
                      <Badge variant="outline">Database</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('skills.design')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">{t('skills.designTools')}</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Figma</Badge>
                      <Badge variant="outline">Adobe Creative Suite</Badge>
                      <Badge variant="outline">Sketch</Badge>
                      <Badge variant="outline">Prototyping</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">{t('skills.designSkills')}</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">UI/UX Design</Badge>
                      <Badge variant="outline">Responsive Design</Badge>
                      <Badge variant="outline">User Research</Badge>
                      <Badge variant="outline">Wireframing</Badge>
                      <Badge variant="outline">Visual Design</Badge>
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
            {t('contact.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('contact.getInTouch')}</CardTitle>
                  <CardDescription>
                    {t('contact.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{t('contact.email')}</div>
                      <div className="text-sm text-muted-foreground">bernardo.gomes@bebitterbebetter.com.br</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{t('contact.github')}</div>
                      <div className="text-sm text-muted-foreground">@bernardopg</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Instagram className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{t('contact.instagram')}</div>
                      <div className="text-sm text-muted-foreground">@be.pgomes</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{t('contact.whatsapp')}</div>
                      <a href="https://wa.me/5531984916431" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:underline">+55 (31) 98491-6431</a>
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