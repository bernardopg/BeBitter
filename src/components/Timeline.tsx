import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface TimelineItem {
  year: string;
  titleKey: string;
  descriptionKey: string;
  type: 'work' | 'education' | 'project';
}

const timelineItems: TimelineItem[] = [
  {
    year: "2024",
    titleKey: 'timeline.2024.title',
    descriptionKey: 'timeline.2024.description',
    type: "work"
  },
  {
    year: "2023",
    titleKey: 'timeline.2023.title',
    descriptionKey: 'timeline.2023.description',
    type: "project"
  },
  {
    year: "2018",
    titleKey: 'timeline.2018.title',
    descriptionKey: 'timeline.2018.description',
    type: "education"
  }
];

const Timeline = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {timelineItems.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            {index < timelineItems.length - 1 && (
              <div className="w-px h-16 bg-border mt-2"></div>
            )}
          </div>
          <Card className="flex-1">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{item.year}</Badge>
                <Badge variant={
                  item.type === 'work' ? 'default' : 
                  item.type === 'education' ? 'outline' : 'secondary'
                }>
                  {t(`timeline.${item.type}`)}
                </Badge>
              </div>
              <h3 className="font-semibold mb-1">{t(item.titleKey)}</h3>
              <p className="text-sm text-muted-foreground">{t(item.descriptionKey)}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Timeline;