export const CATEGORIES = [
  { id: 'all',       label: '🐕 All',       keywords: [] },
  { id: 'reactions', label: '😂 Reactions',  keywords: ['drake', 'distracted', 'button', 'brain', 'galaxy', 'change', 'mind', 'think', 'guy', 'woman', 'yelling', 'cat', 'pointing', 'surprised', 'shocked', 'seriously', 'really', 'wait', 'stop', 'no'] },
  { id: 'animals',   label: '🐶 Animals',    keywords: ['dog', 'cat', 'doge', 'animal', 'bear', 'bird', 'frog', 'kermit', 'grumpy', 'cheems', 'duck', 'wolf', 'lion', 'monkey', 'fish', 'horse', 'cow', 'pig'] },
  { id: 'movies',    label: '🎬 Movies/TV',  keywords: ['buzz', 'woody', 'toy', 'stark', 'thor', 'spiderman', 'batman', 'superman', 'thanos', 'joker', 'gandalf', 'boromir', 'office', 'spongebob', 'patrick', 'squidward', 'simpsons', 'homer', 'futurama', 'fry', 'game', 'throne', 'pirates', 'jack', 'matrix', 'morpheus', 'leo', 'inception', 'titanic', 'disney', 'pixar', 'oprah', 'winfrey', 'show'] },
  { id: 'work',      label: '💼 Work',       keywords: ['work', 'office', 'monday', 'meeting', 'boss', 'email', 'zoom', 'teams', 'deadline', 'corporate', 'job', 'hire', 'fired', 'salary', 'intern', 'manager', 'employee', 'business', 'success', 'fail', 'project'] },
  { id: 'bruh',      label: '💀 Bruh',       keywords: ['bruh', 'pain', 'suffer', 'sad', 'crying', 'depressed', 'stonks', 'broke', 'money', 'oof', 'rip', 'dead', 'skull', 'coffin', 'funeral', 'disaster', 'girl', 'fire', 'fine', 'burn', 'chaos', 'evil', 'conspiracy', 'truth', 'lie', 'fake'] },
]

export function templateMatchesCategory(templateName, categoryId) {
  if (categoryId === 'all') return true

  const category = CATEGORIES.find(c => c.id === categoryId)
  if (!category) return true

  const nameLower = templateName.toLowerCase()
  return category.keywords.some(keyword => nameLower.includes(keyword))
}