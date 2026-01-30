export const BLOG_POSTS = [
  {
    id: 1,
    title: 'Como otimizar APIs com FastAPI e AsyncPG',
    excerpt:
      'Descubra como reduzir o tempo de resposta da sua API em até 50% usando banco de dados assíncrono e as ferramentas certas do Python.',
    category: 'Backend',
    date: '28 Jan, 2026',
    readTime: '5 min',
    image: 'https://placehold.co/800x400/111/emerald?text=FastAPI+Async',
    author: 'Pablo',
  },
  {
    id: 2,
    title: 'Docker para Desenvolvedores: Do Zero ao Deploy',
    excerpt:
      "Um guia prático para criar Dockerfiles eficientes para aplicações Python e React. Chega de 'na minha máquina funciona'.",
    category: 'DevOps',
    date: '15 Jan, 2026',
    readTime: '8 min',
    image: 'https://placehold.co/800x400/111/emerald?text=Docker+Guide',
    author: 'Pablo',
  },
  {
    id: 3,
    title: 'Entendendo o React useEffect de uma vez por todas',
    excerpt:
      'O ciclo de vida dos componentes explicado de forma simples. Evite loops infinitos e memory leaks nos seus projetos frontend.',
    category: 'Frontend',
    date: '10 Jan, 2026',
    readTime: '4 min',
    image: 'https://placehold.co/800x400/111/emerald?text=React+Hooks',
    author: 'Pablo',
  },
  {
    id: 4,
    title: 'Arquitetura Limpa em Python',
    excerpt:
      'Como estruturar seus projetos para que eles sejam fáceis de manter e escalar no longo prazo.',
    category: 'Arquitetura',
    date: '05 Jan, 2026',
    readTime: '12 min',
    image: 'https://placehold.co/800x400/111/emerald?text=Clean+Arch',
    author: 'Pablo',
  },
];

export const POST_CONTENT_MOCK = `
Quando falamos de alta performance em Python, o **FastAPI** é a escolha natural. Mas você está usando o banco de dados da forma correta?

### O Problema do Bloqueio

Muitos desenvolvedores usam drivers síncronos (como \`psycopg2\`) com FastAPI. Isso mata a performance porque bloqueia o *Event Loop*.

Veja um exemplo do jeito **errado**:

\`\`\`python
# Jeito bloqueante (NÃO FAÇA ISSO)
@app.get("/users")
def get_users():
    # Isso trava o servidor até o banco responder.
    results = db.query("SELECT * FROM users") 
    return results
\`\`\`

### A Solução: AsyncPG

Ao migrar para drivers assíncronos, conseguimos lidar com milhares de requisições.

> "Performance não é sobre fazer mais rápido, é sobre fazer mais coisas ao mesmo tempo."

Aqui está como fazer do jeito **certo**:

\`\`\`python
# Jeito assíncrono (CORRETO)
@app.get("/users")
async def get_users():
    # O servidor continua livre enquanto espera o banco
    results = await db.fetch_all("SELECT * FROM users")
    return results
\`\`\`

Isso aumenta o throughput em até **10x**.
`;

export const BLOG_TAGS = [
  'Backend',
  'Frontend',
  'DevOps',
  'Mobile',
  'Carreira',
  'Database',
];
