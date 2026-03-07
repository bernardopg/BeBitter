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
import { ExternalLink, FolderOpen, Github, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  stars?: number;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  featured,
  stars,
}: ProjectCardProps) => {
  const { t } = useLanguage();

  return (
    <Card
      className={`card-enhanced group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        featured ? "ring-2 ring-primary/30 bg-gradient-to-br from-primary/5 to-transparent" : ""
      }`}
    >
      {featured && (
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-primary/20" />
      )}

      <CardHeader className="relative pb-2 p-3 md:p-6 md:pb-2">
        <div className="flex items-start justify-between gap-1">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm md:text-base group-hover:text-primary transition-colors truncate">
              {title}
            </CardTitle>
            {featured && (
              <Badge variant="secondary" className="mt-1.5 text-xs gradient-primary text-white border-0">
                ⭐ {t("projects.featured")}
              </Badge>
            )}
          </div>
          {typeof stars === "number" && (
            <div className="flex items-center gap-0.5 text-muted-foreground shrink-0 mt-0.5">
              <Star className="h-3 w-3" />
              <span className="text-xs font-medium">{stars}</span>
            </div>
          )}
        </div>
        <CardDescription className="text-xs md:text-sm leading-relaxed mt-1.5 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {technologies.slice(0, 3).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all cursor-default"
            >
              {tech}
            </Badge>
          ))}
          {technologies.length > 3 && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              +{technologies.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex gap-1.5">
          <Button asChild variant="outline" size="sm" className="btn-enhanced flex-1 text-xs h-8 px-2 min-w-0">
            <Link to={`/projects/${title}`}>
              <FolderOpen className="mr-1 h-3 w-3 shrink-0" />
              {t("projects.page.viewProject")}
            </Link>
          </Button>
          {githubUrl && (
            <Button asChild variant="ghost" size="sm" className="px-2 h-8 shrink-0">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button asChild size="sm" className="btn-enhanced gradient-primary text-white border-0 px-2 h-8 shrink-0">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
