import { FaCode, FaLaptopCode, FaRocket, FaDatabase } from 'react-icons/fa';

export const PERSONAL_INFO = [
  { label: 'Nome', value: 'Pablo Ortiz' },
  { label: 'Localização', value: 'São Paulo, SP' },
  { label: 'Especialidade', value: 'Full Stack & IA' },
  { label: 'E-mail', value: 'contato@pabloortiz.dev' },
  { label: 'Stack Principal', value: 'Python (FastAPI) & React' },
  { label: 'Infraestrutura', value: 'Linux, Docker & Deploy' },
];

export const STATS = [
  { 
    id: 1, 
    value: 30, 
    suffix: '+', 
    text: 'Repositórios Ativos',
    icon: FaCode 
  },
  { 
    id: 2, 
    value: 5, 
    suffix: '+', 
    text: 'Sistemas Full Stack',
    icon: FaLaptopCode 
  },
  { 
    id: 3, 
    value: 100, 
    suffix: '%', 
    text: 'Arquitetura Clean',
    icon: FaRocket 
  },
  {
    id: 4,
    value: 0,
    suffix: 'SQL/NoSQL', 
    text: 'Database Agnostic', 
    icon: FaDatabase,
    isText: true,
  },
];
