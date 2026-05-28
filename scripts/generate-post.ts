#!/usr/bin/env npx ts-node
/**
 * Generates a new AI-tech blog post via OpenRouter and saves it to PostgreSQL.
 * Run manually: npx ts-node --esm scripts/generate-post.ts
 * Scheduled:    node scripts/scheduler.js  (runs daily at 7pm local time)
 */

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const MODEL = process.env.OPENROUTER_MODEL ?? 'google/gemini-2.0-flash-001'

const adapter = new PrismaPg(process.env.DATABASE_URL!)
const prisma = new PrismaClient({ adapter })

const TOPICS = [
  'How large language models are changing frontend development workflows',
  'Practical uses of AI code review in production engineering teams',
  'Building reliable RAG pipelines for developer tools',
  'The state of AI-assisted testing in 2025',
  'TypeScript patterns that make AI-generated code safer',
  'React Server Components and the AI-powered app architecture shift',
  'Prompt engineering best practices for software engineers',
  'Fine-tuning vs RAG: a pragmatic guide for engineers',
  'AI observability: logging, tracing, and debugging LLM applications',
  'How vector databases are reshaping search in modern web apps',
  'Writing better system prompts for coding assistants',
  'Edge AI: running models close to users with WebAssembly and ONNX',
  'Agent frameworks compared: LangChain, CrewAI, and building your own',
  'The hidden costs of AI in production: latency, tokens, and UX tradeoffs',
  'Using AI to modernize legacy codebases without breaking everything',
]

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

function today(): string {
  return new Date().toISOString().split('T')[0]
}

async function generatePost(): Promise<void> {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not set in environment')
  }

  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)]
  console.log(`Generating post on: "${topic}"`)

  const systemPrompt = `You are a senior software engineer and technical writer.
Write an engaging, opinionated blog post for a personal portfolio site.
The author is Tyler Nguyen — a full stack engineer with 8+ years experience in FinTech and warehouse management,
expert in React, TypeScript, Node.js, and AWS.

Respond ONLY with a JSON object matching this exact shape:
{
  "title": "string — compelling post title",
  "slug": "string — url-friendly slug (lowercase, hyphens only)",
  "excerpt": "string — 1–2 sentence summary, no spoilers",
  "tags": ["string", ...],
  "content": "string — full post in markdown, 600–900 words, first-person voice, concrete and specific"
}

Rules:
- Write from Tyler's perspective with real engineering experience
- Include specific code examples or concrete patterns where relevant
- Use a natural, human-like tone with no em dashes
- No preamble, no explanation — just the JSON object`

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://tyler-nguyen.dev',
      'X-Title': 'Tyler Nguyen Portfolio Blog Generator',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Write a blog post about: ${topic}` },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`OpenRouter error ${res.status}: ${err}`)
  }

  const data = await res.json()
  const raw = data.choices?.[0]?.message?.content
  if (!raw) throw new Error('Empty response from OpenRouter')

  let post: { title: string; slug: string; excerpt: string; tags: string[]; content: string }
  try {
    post = JSON.parse(raw)
  } catch {
    throw new Error(`Failed to parse JSON response: ${raw.slice(0, 200)}`)
  }

  const slug = post.slug || slugify(post.title)

  const existing = await prisma.post.findUnique({ where: { slug } })
  if (existing) {
    console.log(`Post already exists: ${slug} — skipping`)
    return
  }

  await prisma.post.create({
    data: {
      slug,
      title: post.title,
      excerpt: post.excerpt,
      tags: post.tags,
      date: new Date(today()),
      published: true,
      content: post.content,
    },
  })

  console.log(`✓ Saved to database: ${slug}`)
}

generatePost()
  .catch((err) => {
    console.error('Generation failed:', err.message)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
