export async function getMemeIdeas(templateName, userPrompt = '') {
  const apiKey = import.meta.env.VITE_COHERE_API_KEY

  const extraInstruction = userPrompt.trim()
    ? `Also follow this instruction: ${userPrompt.trim()}.`
    : ''

  const response = await fetch('https://api.cohere.com/v2/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'command-r-plus-08-2024',
      messages: [
        {
          role: 'user',
          content: `Give me 5 funny meme ideas for the "${templateName}" meme template.
${extraInstruction}
Reply ONLY with a JSON array exactly like this, no extra text, no markdown:
[
  {"top": "top text here", "bottom": "bottom text here"},
  {"top": "top text here", "bottom": "bottom text here"},
  {"top": "top text here", "bottom": "bottom text here"},
  {"top": "top text here", "bottom": "bottom text here"},
  {"top": "top text here", "bottom": "bottom text here"}
]`,
        },
      ],
    }),
  })

  const data = await response.json()
  if (data.error) throw new Error(data.error.message)

  const text = data.message.content[0].text
  const cleaned = text.replace(/```json|```/g, '').trim()
  const start = cleaned.indexOf('[')
  const end   = cleaned.lastIndexOf(']') + 1
  return JSON.parse(cleaned.slice(start, end))
}