import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  type: 'work' | 'education' | 'project';
}

const timelineItems: TimelineItem[] = [
  {
    year: "2024",
    title: "Full Stack Developer",
    description: "Desenvolvendo aplicações web modernas com React, Node.js e tecnologias cloud",
    type: "work"
  },
  {
    year: "2023",
    title: "Photography Portfolio Launch",
    description: "Lancei meu portfolio de fotografia no Instagram, focando em street photography",
    type: "project"
  },
  {
    year: "2022",
    title: "Web Development Journey",
    description: "Iniciei minha jornada no desenvolvimento web, aprendendo JavaScript e React",
    type: "education"
  }
];

const Timeline = () => {
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
                  {item.type}
                </Badge>
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Timeline;