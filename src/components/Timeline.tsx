import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { Briefcase, Code, GraduationCap } from "lucide-react";

interface TimelineItem {
  year: string;
  titleKey: string;
  descriptionKey: string;
  type: "work" | "education" | "project";
}

const timelineItems: TimelineItem[] = [
  {
    year: "2024",
    titleKey: "timeline.2024.title",
    descriptionKey: "timeline.2024.description",
    type: "work",
  },
  {
    year: "2023",
    titleKey: "timeline.2023.title",
    descriptionKey: "timeline.2023.description",
    type: "project",
  },
  {
    year: "2018",
    titleKey: "timeline.2018.title",
    descriptionKey: "timeline.2018.description",
    type: "education",
  },
];

const Timeline = () => {
  const { t } = useLanguage();

  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Briefcase className="h-4 w-4" />;
      case "education":
        return <GraduationCap className="h-4 w-4" />;
      case "project":
        return <Code className="h-4 w-4" />;
      default:
        return <Code className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {timelineItems.map((item, index) => (
        <div key={index} className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-primary rounded-full shadow-lg animate-pulse"></div>
            {index < timelineItems.length - 1 && (
              <div className="w-px h-20 bg-gradient-to-b from-primary to-transparent mt-4"></div>
            )}
          </div>
          <Card className="flex-1 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="secondary" className="flex items-center gap-1">
                  {getIcon(item.type)}
                  {item.year}
                </Badge>
                <Badge
                  variant={
                    item.type === "work"
                      ? "default"
                      : item.type === "education"
                      ? "outline"
                      : "secondary"
                  }
                  className="flex items-center gap-1"
                >
                  {getIcon(item.type)}
                  {t(`timeline.${item.type}`)}
                </Badge>
              </div>
              <h3 className="font-semibold mb-2 text-lg">{t(item.titleKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(item.descriptionKey)}
              </p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
