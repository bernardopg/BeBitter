export interface ServiceFaqEntry {
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

export const SERVICES_FAQ: ServiceFaqEntry[] = [
  {
    question: "Que tipo de projeto você aceita?",
    questionEn: "What kind of project do you take on?",
    answer:
      "Projetos que precisam de clareza e entrega: interfaces em React/TypeScript, automações e integrações em Python, ferramentas internas, dashboards e tooling para Linux. Trabalho bem com escopos definidos e MVPs que resolvem um problema real — não pego projetos sem objetivo claro.",
    answerEn:
      "Projects that need clarity and delivery: React/TypeScript interfaces, Python automations and integrations, internal tools, dashboards, and Linux tooling. I work best with defined scopes and MVPs that solve a real problem — I don't take projects without a clear goal.",
  },
  {
    question: "Como funcionam orçamento e prazo?",
    questionEn: "How do budget and timeline work?",
    answer:
      "Depois de entender o contexto, eu proponho o menor escopo viável com estimativa fechada de prazo e valor. Projetos maiores são quebrados em entregas quinzenais para você acompanhar o progresso e ajustar prioridades sem surpresa no final.",
    answerEn:
      "After understanding the context, I propose the smallest viable scope with a fixed estimate for timeline and price. Larger projects are broken into biweekly deliveries so you can track progress and adjust priorities without surprises at the end.",
  },
  {
    question: "Você trabalha remoto e atende fora do Brasil?",
    questionEn: "Do you work remotely and with clients outside Brazil?",
    answer:
      "Sim. Trabalho 100% remoto a partir de Belo Horizonte (GMT-3), em português ou inglês. Comunicação assíncrona por WhatsApp, e-mail ou a ferramenta que seu time já usa.",
    answerEn:
      "Yes. I work 100% remotely from Belo Horizonte, Brazil (GMT-3), in Portuguese or English. Async communication via WhatsApp, email, or whatever tool your team already uses.",
  },
  {
    question: "Quais tecnologias você usa no dia a dia?",
    questionEn: "Which technologies do you use day to day?",
    answer:
      "Frontend: React 19, TypeScript, Vite, Tailwind CSS. Automação e backend: Python, FastAPI, Node.js. Infra: Linux, CI/CD com GitHub Actions, deploys automatizados. Também desenvolvo plugins QML para desktop Linux e projetos com hardware (Arduino/ESP32 + Tauri/Rust).",
    answerEn:
      "Frontend: React 19, TypeScript, Vite, Tailwind CSS. Automation and backend: Python, FastAPI, Node.js. Infra: Linux, CI/CD with GitHub Actions, automated deploys. I also build QML plugins for Linux desktop and hardware projects (Arduino/ESP32 + Tauri/Rust).",
  },
  {
    question: "Você mantém o projeto depois da entrega?",
    questionEn: "Do you maintain the project after delivery?",
    answer:
      "Sim, se fizer sentido para o projeto. Toda entrega sai com documentação, logs e instruções de operação para o seu time ser autônomo. Para quem prefere, ofereço manutenção contínua com escopo mensal definido.",
    answerEn:
      "Yes, when it makes sense for the project. Every delivery ships with documentation, logs, and operating instructions so your team can be autonomous. If you prefer, I offer ongoing maintenance with a defined monthly scope.",
  },
  {
    question: "Como começamos?",
    questionEn: "How do we get started?",
    answer:
      "Me chame no WhatsApp ou e-mail com uma descrição curta do problema. Em geral respondo em até 24h com perguntas de contexto e, se houver encaixe, uma proposta de escopo inicial em poucos dias.",
    answerEn:
      "Reach out via WhatsApp or email with a short description of the problem. I usually reply within 24h with context questions and, if we're a fit, an initial scope proposal within a few days.",
  },
];
