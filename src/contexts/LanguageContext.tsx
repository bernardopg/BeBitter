import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    // Hero Section
    'hero.title': 'Bernardo Gomes',
    'hero.subtitle': 'Desenvolvedor Full Stack & Designer de Websites',
    'hero.location': 'Brasil',
    'hero.availability': 'Disponível para projetos',
    'hero.github': 'GitHub',
    'hero.instagram': 'Instagram',
    'hero.contact': 'Contato',

    // About Section
    'about.title': 'Sobre Mim',
    'about.description1': 'Sou um desenvolvedor e designer apaixonado por tecnologia, sempre em busca de criar experiências digitais únicas e memoráveis. Com experiência em desenvolvimento web full-stack e design de interfaces, combino habilidades técnicas com visão criativa.',
    'about.description2': 'Quando não estou programando ou criando designs, gosto de explorar novas tecnologias, contribuir para projetos open source e compartilhar conhecimento com a comunidade de desenvolvedores e designers.',
    'about.expertise': 'Principais Especialidades',
    'about.fullstack': 'Desenvolvimento Full Stack',
    'about.uiux': 'UI/UX Design',
    'about.website': 'Desenvolvimento de Websites',
    'about.responsive': 'Design Responsivo',
    'about.stats': 'Estatísticas Rápidas',
    'about.experience': 'Experiência',
    'about.projects': 'Projetos',
    'about.designs': 'Designs',
    'about.coffee': 'Xícaras de Café',
    'about.years': '3+ Anos',
    'about.projectsCount': '50+',
    'about.designsCount': '30+',
    'about.coffeeCount': '∞',
    'about.status': 'Status Atual',
    'about.available': 'Disponível para projetos',
    'about.location': 'Baseado no Brasil',
    'about.collaboration': 'Aberto a colaborações',
    'about.techstack': 'Stack Tecnológica & Ferramentas de Design',

    // Projects Section
    'projects.title': 'Projetos em Destaque',
    'projects.portfolio.title': 'Website Portfolio Pessoal',
    'projects.portfolio.description': 'Portfolio moderno e responsivo construído com React e TypeScript, com design limpo, animações suaves e suporte multilíngue.',
    'projects.tools.title': 'Ferramentas e Scripts de Desenvolvimento',
    'projects.tools.description': 'Coleção de scripts utilitários e ferramentas de automação para otimização do fluxo de trabalho de desenvolvimento web.',
    'projects.components.title': 'Biblioteca de Componentes React',
    'projects.components.description': 'Componentes React reutilizáveis construídos com práticas modernas, suporte ao TypeScript e documentação abrangente.',
    'projects.design.title': 'Projetos de UI/UX Design',
    'projects.design.description': 'Designs modernos de websites e interfaces de usuário com foco na experiência do usuário e apelo visual.',
    'projects.code': 'Código',
    'projects.live': 'Ao Vivo',
    'projects.viewAll': 'Ver Todos os Projetos',

    // Timeline Section
    'timeline.title': 'Minha Jornada',
    'timeline.2024.title': 'Desenvolvedor Full Stack & Designer',
    'timeline.2024.description': 'Desenvolvendo aplicações web modernas e criando designs únicos com foco na experiência do usuário',
    'timeline.2023.title': 'Foco em UI/UX Design',
    'timeline.2023.description': 'Expandindo habilidades em design de interfaces e experiência do usuário, criando protótipos e wireframes',
    'timeline.2018.title': 'Jornada no Desenvolvimento Web',
    'timeline.2018.description': 'Iniciei minha jornada no desenvolvimento web, aprendendo JavaScript, React e princípios de design',
    'timeline.work': 'trabalho',
    'timeline.project': 'projeto',
    'timeline.education': 'educação',

    // Skills Section
    'skills.title': 'Habilidades & Tecnologias',
    'skills.development': 'Habilidades de Desenvolvimento',
    'skills.frontend': 'Tecnologias Frontend',
    'skills.backend': 'Backend & Ferramentas',
    'skills.design': 'Design & Criativo',
    'skills.designTools': 'Ferramentas de Design',
    'skills.designSkills': 'Habilidades de Design',

    // Contact Section
    'contact.title': 'Vamos nos Conectar',
    'contact.getInTouch': 'Entre em Contato',
    'contact.description': 'Estou sempre animado para discutir novos projetos, oportunidades de desenvolvimento ou colaborar em ideias interessantes.',
    'contact.email': 'Email',
    'contact.github': 'GitHub',
    'contact.instagram': 'Instagram',
    'contact.whatsapp': 'WhatsApp',
    'contact.form.title': 'Me envie uma mensagem',
    'contact.form.description': 'Adoraria ouvir sobre seu projeto ou discutir oportunidades de desenvolvimento!',
    'contact.form.name': 'Seu nome',
    'contact.form.email': 'Seu email',
    'contact.form.message': 'Sua mensagem...',
    'contact.form.send': 'Enviar Mensagem',
  },
  en: {
    // Hero Section
    'hero.title': 'Bernardo Gomes',
    'hero.subtitle': 'Full Stack Developer & Website Designer',
    'hero.location': 'Brazil',
    'hero.availability': 'Available for projects',
    'hero.github': 'GitHub',
    'hero.instagram': 'Instagram',
    'hero.contact': 'Contact',

    // About Section
    'about.title': 'About Me',
    'about.description1': 'I am a developer and designer passionate about technology, always seeking to create unique and memorable digital experiences. With experience in full-stack web development and interface design, I combine technical skills with creative vision.',
    'about.description2': 'When I\'m not programming or creating designs, I enjoy exploring new technologies, contributing to open source projects, and sharing knowledge with the developer and designer community.',
    'about.expertise': 'Core Expertise',
    'about.fullstack': 'Full Stack Development',
    'about.uiux': 'UI/UX Design',
    'about.website': 'Website Development',
    'about.responsive': 'Responsive Design',
    'about.stats': 'Quick Stats',
    'about.experience': 'Experience',
    'about.projects': 'Projects',
    'about.designs': 'Designs',
    'about.coffee': 'Coffee Cups',
    'about.years': '3+ Years',
    'about.projectsCount': '50+',
    'about.designsCount': '30+',
    'about.coffeeCount': '∞',
    'about.status': 'Current Status',
    'about.available': 'Available for projects',
    'about.location': 'Based in Brazil',
    'about.collaboration': 'Open to collaboration',
    'about.techstack': 'Tech Stack & Design Tools',

    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.portfolio.title': 'Personal Portfolio Website',
    'projects.portfolio.description': 'Modern, responsive portfolio built with React and TypeScript, featuring clean design, smooth animations, and multilingual support.',
    'projects.tools.title': 'Web Development Tools & Scripts',
    'projects.tools.description': 'Collection of utility scripts and automation tools for web development workflow optimization.',
    'projects.components.title': 'React Component Library',
    'projects.components.description': 'Reusable React components built with modern practices, TypeScript support, and comprehensive documentation.',
    'projects.design.title': 'UI/UX Design Projects',
    'projects.design.description': 'Modern website designs and user interfaces with focus on user experience and visual appeal.',
    'projects.code': 'Code',
    'projects.live': 'Live',
    'projects.viewAll': 'View All Projects',

    // Timeline Section
    'timeline.title': 'My Journey',
    'timeline.2024.title': 'Full Stack Developer & Designer',
    'timeline.2024.description': 'Developing modern web applications and creating unique designs with focus on user experience',
    'timeline.2023.title': 'UI/UX Design Focus',
    'timeline.2023.description': 'Expanding skills in interface design and user experience, creating prototypes and wireframes',
    'timeline.2018.title': 'Web Development Journey',
    'timeline.2018.description': 'Started my journey in web development, learning JavaScript, React and design principles',
    'timeline.work': 'work',
    'timeline.project': 'project',
    'timeline.education': 'education',

    // Skills Section
    'skills.title': 'Skills & Technologies',
    'skills.development': 'Development Skills',
    'skills.frontend': 'Frontend Technologies',
    'skills.backend': 'Backend & Tools',
    'skills.design': 'Design & Creative',
    'skills.designTools': 'Design Tools',
    'skills.designSkills': 'Design Skills',

    // Contact Section
    'contact.title': 'Let\'s Connect',
    'contact.getInTouch': 'Get In Touch',
    'contact.description': 'I\'m always excited to discuss new projects, development opportunities, or collaborate on interesting ideas.',
    'contact.email': 'Email',
    'contact.github': 'GitHub',
    'contact.instagram': 'Instagram',
    'contact.whatsapp': 'WhatsApp',
    'contact.form.title': 'Send me a message',
    'contact.form.description': 'I\'d love to hear about your project or discuss development opportunities!',
    'contact.form.name': 'Your name',
    'contact.form.email': 'Your email',
    'contact.form.message': 'Your message...',
    'contact.form.send': 'Send Message',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};