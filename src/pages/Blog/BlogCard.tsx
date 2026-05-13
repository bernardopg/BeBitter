import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { BlogPost } from "@/constants/blog-posts";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const { t, language } = useLanguage();

  const title = language === "en" && post.titleEn ? post.titleEn : post.title;
  const excerpt =
    language === "en" && post.excerptEn ? post.excerptEn : post.excerpt;

  const formattedDate = new Date(post.date).toLocaleDateString(
    language === "en" ? "en-US" : "pt-BR",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="glass card-enhanced h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <time className="text-xs text-muted-foreground" dateTime={post.date}>
              {formattedDate}
            </time>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>
                {post.readingTime} {t("blog.readingTime")}
              </span>
            </div>
          </div>
          {post.featured && (
            <Badge
              variant="default"
              className="w-fit gradient-primary text-white border-0 text-xs mb-2"
            >
              {t("blog.featured")}
            </Badge>
          )}
          <h3 className="font-semibold text-lg leading-snug line-clamp-2">
            {title}
          </h3>
        </CardHeader>

        <CardContent className="flex-1 pb-2">
          <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-3 pt-0">
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="group p-0 h-auto text-primary"
          >
            <Link to={`/blog/${post.slug}`}>
              {t("blog.readMore")}
              <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
