import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  featured,
}: ProjectCardProps) => {
  const { t } = useLanguage();

  return (
    <Card
      className={`card-enhanced group relative overflow-hidden ${
        featured ? "ring-2 ring-primary/30 bg-gradient-to-br from-primary/5 to-transparent" : ""
      }`}
    >
      {featured && (
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-primary/20" />
      )}
      
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            {featured && (
              <Badge variant="secondary" className="mt-2 gradient-primary text-white border-0">
                ⭐ Featured
              </Badge>
            )}
          </div>
        </div>
        <CardDescription className="text-sm leading-relaxed mt-3">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <Badge 
              key={tech} 
              variant="outline" 
              className="text-xs hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all cursor-default"
            >
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          {githubUrl && (
            <Button asChild variant="outline" size="sm" className="btn-enhanced flex-1">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-3 w-3" />
                {t("projects.code")}
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button asChild size="sm" className="btn-enhanced gradient-primary text-white border-0 flex-1">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-3 w-3" />
                {t("projects.live")}
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
