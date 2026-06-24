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
import { GitHubIcon } from "@/components/icons/social-icons";
import { ExternalLink, FolderOpen, Star } from "lucide-react";
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
      className={`card-enhanced card-glow group relative flex h-full flex-col overflow-hidden rounded-xl ${
        featured
          ? "border-primary/30 bg-gradient-to-br from-primary/[0.07] to-transparent"
          : ""
      }`}
    >
      <CardHeader className="relative p-4 pb-2 md:p-5 md:pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm md:text-base font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </CardTitle>
          {typeof stars === "number" && stars > 0 && (
            <div className="flex items-center gap-0.5 text-amber-500 shrink-0 mt-0.5">
              <Star className="h-3.5 w-3.5 fill-amber-500/20" />
              <span className="text-xs font-semibold">{stars}</span>
            </div>
          )}
        </div>
        {featured && (
          <Badge className="mt-2 w-fit gradient-primary text-white border-0 text-[10px] uppercase tracking-wide">
            <Star className="mr-1 h-2.5 w-2.5 fill-white" />
            {t("projects.featured")}
          </Badge>
        )}
        <CardDescription className="text-xs md:text-sm leading-relaxed mt-2 line-clamp-2 min-h-[2.5rem]">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto flex flex-col gap-3 p-4 pt-0 md:p-5 md:pt-0">
        <div className="flex flex-wrap gap-1.5">
          {technologies.slice(0, 3).map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-[10px] font-medium text-muted-foreground bg-muted/60"
            >
              {tech}
            </Badge>
          ))}
          {technologies.length > 3 && (
            <Badge variant="outline" className="text-[10px] text-muted-foreground">
              +{technologies.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex gap-1.5">
          <Button asChild variant="outline" size="sm" className="btn-enhanced flex-1 text-xs h-9 min-w-0 group-hover:border-primary/40">
            <Link to={`/projects/${title}`}>
              <FolderOpen className="mr-1.5 h-3.5 w-3.5 shrink-0" />
              {t("projects.page.viewProject")}
            </Link>
          </Button>
          {githubUrl && (
            <Button asChild variant="ghost" size="sm" className="px-2.5 h-9 shrink-0" aria-label="GitHub">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <GitHubIcon className="h-4 w-4" />
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button asChild variant="gradient" size="sm" className="btn-enhanced px-2.5 h-9 shrink-0" aria-label="Live Demo">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
