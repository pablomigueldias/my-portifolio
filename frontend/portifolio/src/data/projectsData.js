export const PROJECTS = [
  {
    id: 1,
    title: 'WikiFans',
    category: 'fullstack',
    image: 'https://placehold.co/600x400/111/emerald?text=WikiFans',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'Render', 'Docker', 'Redis'],
    description:
      'Wiki completa com autenticação e gestão de conteúdo. Frontend na Vercel e Backend no Render.',
    longDescription: "Uma plataforma completa de Wiki onde fãs podem criar e editar artigos. O desafio principal foi gerenciar o estado global de autenticação e garantir que o conteúdo markdown fosse renderizado e sanitizado em tempo real para evitar XSS.",
        challenges: [
            "Implementar autenticação JWT segura com Refresh Tokens entre domínios diferentes (CORS).",
            "Otimizar as queries do SQLAlchemy (Eager Loading) para reduzir o tempo de resposta em 40%.",
            "Criar um sistema de cache no frontend (React Query) para evitar chamadas redundantes."
        ],
    githubLink: '#',
    deployLink: '#',
  },
  {
    id: 2,
    title: 'Budget Manager',
    category: 'fullstack',
    image: 'https://placehold.co/600x400/111/emerald?text=Budget+Manager',
    tech: ['React', 'Python', 'SQLAlchemy', 'Chart.js'],
    description:
      'Sistema de controle financeiro pessoal com dashboards visuais e banco de dados relacional.',
    longDescription: "Uma plataforma completa de Wiki onde fãs podem criar e editar artigos. O desafio principal foi gerenciar o estado global de autenticação e garantir que o conteúdo markdown fosse renderizado e sanitizado em tempo real para evitar XSS.",
        challenges: [
            "Implementar autenticação JWT segura com Refresh Tokens entre domínios diferentes (CORS).",
            "Otimizar as queries do SQLAlchemy (Eager Loading) para reduzir o tempo de resposta em 40%.",
            "Criar um sistema de cache no frontend (React Query) para evitar chamadas redundantes."
        ],
    githubLink: '#',
    deployLink: '#',
  },
  {
    id: 3,
    title: 'Todo App API',
    category: 'backend',
    image: 'https://placehold.co/600x400/111/emerald?text=Todo+API',
    tech: ['FastAPI', 'JWT Auth', 'Alembic', 'Docker'],
    description:
      'Backend robusto com autenticação JWT segura, migrações de banco e rotas documentadas (Swagger).',
    longDescription: "Uma plataforma completa de Wiki onde fãs podem criar e editar artigos. O desafio principal foi gerenciar o estado global de autenticação e garantir que o conteúdo markdown fosse renderizado e sanitizado em tempo real para evitar XSS.",
        challenges: [
            "Implementar autenticação JWT segura com Refresh Tokens entre domínios diferentes (CORS).",
            "Otimizar as queries do SQLAlchemy (Eager Loading) para reduzir o tempo de resposta em 40%.",
            "Criar um sistema de cache no frontend (React Query) para evitar chamadas redundantes."
        ],
    githubLink: '#',
    deployLink: null,
  },
  {
    id: 4,
    title: 'Jokenpo Pro',
    category: 'frontend',
    image: 'https://placehold.co/600x400/111/emerald?text=Jokenpo',
    tech: ['React', 'Vite', 'TailwindCSS', 'Game Logic'],
    description:
      'Jogo interativo Pedra, Papel e Tesoura com gerenciamento de estado complexo e animações.',
    longDescription: "Uma plataforma completa de Wiki onde fãs podem criar e editar artigos. O desafio principal foi gerenciar o estado global de autenticação e garantir que o conteúdo markdown fosse renderizado e sanitizado em tempo real para evitar XSS.",
        challenges: [
            "Implementar autenticação JWT segura com Refresh Tokens entre domínios diferentes (CORS).",
            "Otimizar as queries do SQLAlchemy (Eager Loading) para reduzir o tempo de resposta em 40%.",
            "Criar um sistema de cache no frontend (React Query) para evitar chamadas redundantes."
        ],
    githubLink: '#',
    deployLink: '#',
  },
  {
    id: 5,
    title: 'AI Job Hunter',
    category: 'automacao',
    image: 'https://placehold.co/600x400/111/emerald?text=AI+Bot',
    tech: ['Python', 'Selenium', 'Ollama LLM', 'Web Scraping'],
    description:
      'Bot inteligente que busca vagas e preenche formulários automaticamente usando IA local.',
    longDescription: "Uma plataforma completa de Wiki onde fãs podem criar e editar artigos. O desafio principal foi gerenciar o estado global de autenticação e garantir que o conteúdo markdown fosse renderizado e sanitizado em tempo real para evitar XSS.",
        challenges: [
            "Implementar autenticação JWT segura com Refresh Tokens entre domínios diferentes (CORS).",
            "Otimizar as queries do SQLAlchemy (Eager Loading) para reduzir o tempo de resposta em 40%.",
            "Criar um sistema de cache no frontend (React Query) para evitar chamadas redundantes."
        ],
    githubLink: '#',
    deployLink: null,
  },
  {
    id: 6,
    title: 'Linux Setup Scripts',
    category: 'devops',
    image: 'https://placehold.co/600x400/111/emerald?text=Bash+Scripts',
    tech: ['Bash', 'Shell', 'Linux'],
    description: 'Scripts de automação para configuração de ambiente.',
    longDescription: "Uma plataforma completa de Wiki onde fãs podem criar e editar artigos. O desafio principal foi gerenciar o estado global de autenticação e garantir que o conteúdo markdown fosse renderizado e sanitizado em tempo real para evitar XSS.",
        challenges: [
            "Implementar autenticação JWT segura com Refresh Tokens entre domínios diferentes (CORS).",
            "Otimizar as queries do SQLAlchemy (Eager Loading) para reduzir o tempo de resposta em 40%.",
            "Criar um sistema de cache no frontend (React Query) para evitar chamadas redundantes."
        ],
    githubLink: '#',
    deployLink: null,
  },
  {
    id: 7,
    title: 'Python DSA',
    category: 'backend',
    image: 'https://placehold.co/600x400/111/emerald?text=Algorithms',
    tech: ['Python', 'Unittest'],
    description: 'Implementação de estruturas de dados e algoritmos.',
    longDescription: "Uma plataforma completa de Wiki onde fãs podem criar e editar artigos. O desafio principal foi gerenciar o estado global de autenticação e garantir que o conteúdo markdown fosse renderizado e sanitizado em tempo real para evitar XSS.",
        challenges: [
            "Implementar autenticação JWT segura com Refresh Tokens entre domínios diferentes (CORS).",
            "Otimizar as queries do SQLAlchemy (Eager Loading) para reduzir o tempo de resposta em 40%.",
            "Criar um sistema de cache no frontend (React Query) para evitar chamadas redundantes."
        ],
    githubLink: '#',
    deployLink: null,
  },
  {
    id: 8,
    title: 'WikiFans FullStack',
    category: 'Full Stack Web App',
    description:
      'Uma plataforma completa de Wiki onde fãs podem criar e editar artigos. O desafio principal foi gerenciar o estado global de autenticação e garantir que o conteúdo markdown fosse renderizado e sanitizado em tempo real para evitar XSS.',
    image: 'https://placehold.co/1200x600/111/emerald?text=WikiFans+Dashboard',
    techs: ['React', 'FastAPI', 'PostgreSQL', 'Docker', 'Render', 'Vercel'],
    longDescription:
      'Uma plataforma completa de Wiki onde fãs podem criar e editar artigos. O desafio principal foi gerenciar o estado global de autenticação e garantir que o conteúdo markdown fosse renderizado e sanitizado em tempo real para evitar XSS.',
    challenges: [
      'Implementar autenticação JWT segura com Refresh Tokens entre domínios diferentes (CORS).',
      'Otimizar as queries do SQLAlchemy (Eager Loading) para reduzir o tempo de resposta em 40%.',
      'Criar um sistema de cache no frontend (React Query) para evitar chamadas redundantes.',
    ],
    github: 'https://github.com',
    deploy: 'https://vercel.com',
  },
  {
    id: 9,
    title: 'Budget Manager',
    category: 'Fintech Dashboard',
    description:
      'Sistema de controle financeiro pessoal. Permite categorização de gastos, gráficos mensais e exportação de relatórios.',
    image: 'https://placehold.co/1200x600/111/emerald?text=Budget+Manager',
    techs: ['React', 'Python', 'SQLAlchemy', 'Chart.js'],
    longDescription:
      'Uma plataforma completa de Wiki onde fãs podem criar e editar artigos. O desafio principal foi gerenciar o estado global de autenticação e garantir que o conteúdo markdown fosse renderizado e sanitizado em tempo real para evitar XSS.',
    challenges: [
      'Implementar autenticação JWT segura com Refresh Tokens entre domínios diferentes (CORS).',
      'Otimizar as queries do SQLAlchemy (Eager Loading) para reduzir o tempo de resposta em 40%.',
      'Criar um sistema de cache no frontend (React Query) para evitar chamadas redundantes.',
    ],
    github: '#',
    deploy: '#',
  },
];

export const FILTERS = [
  { label: 'Todos', value: 'todos' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'Backend', value: 'backend' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'DevOps', value: 'devops' },
  { label: 'Automação', value: 'automacao' },
];
