import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { Code, Coffee, Heart, Lightbulb, Target } from "lucide-react";

const Now = () => {
  const { t } = useLanguage();

  const currentFocus = [
    {
      icon: <Code className="h-5 w-5" />,
      title: "Desenvolvimento de Apps Web",
      description:
        "Trabalhando em aplicações React/Next.js com foco em performance e acessibilidade",
      status: "Ativo",
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Aprendizado Contínuo",
      description:
        "Estudando novas tecnologias como Web Components e arquitetura de microsserviços",
      status: "Em andamento",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Projetos Pessoais",
      description:
        "Desenvolvendo ferramentas de automação e scripts para otimizar workflows",
      status: "Ativo",
    },
  ];

  const recentAchievements = [
    "🚀 Lançou portfolio responsivo com React + TypeScript",
    "📚 Concluiu curso avançado de Next.js",
    "🎯 Alcançou 500+ usuários em projetos open source",
    "☕ Manteve rotina de aprendizado diário",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            O que estou fazendo agora
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Uma atualização em tempo real sobre meus projetos atuais,
            aprendizados e foco profissional. Atualizado em{" "}
            {new Date().toLocaleDateString("pt-BR")}.
          </p>
        </div>

        {/* Current Focus */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Target className="h-7 w-7" />
            Foco Atual
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentFocus.map((item, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-primary">{item.icon}</div>
                    <Badge variant="secondary" className="text-xs">
                      {item.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Achievements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Heart className="h-7 w-7" />
            Conquistas Recentes
          </h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {recentAchievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-lg mt-1">
                      {achievement.split(" ")[0]}
                    </span>
                    <span className="text-muted-foreground leading-relaxed">
                      {achievement.substring(achievement.indexOf(" ") + 1)}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Personal Note */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Coffee className="h-7 w-7" />
            Nota Pessoal
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Atualmente estou focado em criar experiências web excepcionais
                  enquanto continuo aprendendo e contribuindo para a comunidade
                  de desenvolvedores. Acredito que a combinação de tecnologia e
                  criatividade pode resolver problemas reais e melhorar vidas.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Quando não estou codando, gosto de explorar novas ferramentas,
                  contribuir para projetos open source e compartilhar
                  conhecimento. Estou sempre aberto a novas oportunidades e
                  colaborações interessantes.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Vamos conversar?</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Se você tem um projeto interessante ou quer discutir
                oportunidades, adoraria ouvir de você!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:bernardo.gomes@bebitterbebetter.com.br"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Enviar e-mail
                </a>
                <a
                  href="https://wa.me/5531984916431"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary/5 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Now;
