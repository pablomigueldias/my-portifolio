import { FaCode, FaLaptopCode, FaRocket, FaDatabase } from 'react-icons/fa';

export const PERSONAL_INFO = [
  { label: 'Nome', value: 'Pablo Ortiz' },
  { label: 'Residência', value: 'Brasil' },
  { label: 'Freelance', value: 'Disponível' },
  { label: 'Email', value: 'devpablo@gmail.com' },
  { label: 'Stack', value: 'Python & React' },
  { label: 'Nível', value: 'Full Stack' },
];

export const STATS = [
  { id: 1, value: 30, suffix: '+', text: 'Projetos GitHub', icon: FaCode },
  { id: 2, value: 240, suffix: 'h', text: 'Horas Codando', icon: FaLaptopCode },
  { id: 3, value: 100, suffix: '%', text: 'Entregas no Prazo', icon: FaRocket },
  {
    id: 4,
    value: 0,
    suffix: 'SQL',
    text: 'Database Expert',
    icon: FaDatabase,
    isText: true,
  },
];
