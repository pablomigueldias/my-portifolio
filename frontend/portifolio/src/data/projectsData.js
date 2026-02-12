// 1. Defina as categorias aceitas no sistema (Para usar no Editor e no Banco)
export const PROJECT_CATEGORIES = [
  { label: 'Fullstack Development', value: 'Fullstack' },
  { label: 'Frontend Engineering',  value: 'Frontend' },
  { label: 'Backend Architecture',  value: 'Backend' },
  { label: 'Mobile Application',    value: 'Mobile' },
  { label: 'Data Science & AI',     value: 'Data Science' },
  { label: 'DevOps & Cloud',        value: 'DevOps' },
];

export const FILTERS = [
  { label: 'Todos', value: 'todos' },
  ...PROJECT_CATEGORIES.map(cat => ({
    label: cat.value,
    value: cat.value
  }))
];
