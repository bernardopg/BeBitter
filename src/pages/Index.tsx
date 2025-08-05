import { Button } from "@/components/ui/button";
import { Github, Instagram, Mail } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Hero Section */}
        <section className="mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bernardo Gomes</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Developer & Photography Enthusiast
          </p>
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <a href="https://github.com/bernardopg" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://instagram.com/be.pgomes" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-4 w-4" />
                Instagram
              </a>
            </Button>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6">About Me</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              I'm a passionate developer with experience in web technologies and a keen eye for photography.
            </p>
            <p>
              My work combines technical skills with creative vision to build meaningful digital experiences.
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 hover:bg-accent/50 transition-colors">
              <h3 className="font-medium mb-2">GitHub Projects</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore my coding projects and contributions on GitHub.
              </p>
              <Button asChild variant="link" className="px-0">
                <a href="https://github.com/bernardopg" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
            </div>
            <div className="border rounded-lg p-6 hover:bg-accent/50 transition-colors">
              <h3 className="font-medium mb-2">Photography</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Check out my photography work on Instagram.
              </p>
              <Button asChild variant="link" className="px-0">
                <a href="https://instagram.com/be.pgomes" target="_blank" rel="noopener noreferrer">
                  View on Instagram
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
          <Button asChild>
            <a href="mailto:your-email@example.com">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </a>
          </Button>
        </section>

        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;