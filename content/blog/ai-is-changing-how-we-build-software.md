---
title: "AI Is Changing How We Build Software, And I'm Here for It"
slug: "ai-is-changing-how-we-build-software"
excerpt: "After 8 years in the industry I've seen plenty of hype cycles. AI-assisted development feels different. Here's what's actually changed in my day-to-day workflow."
tags: ["AI", "Developer Tools", "Productivity", "React", "TypeScript"]
date: "2025-05-27"
published: true
---

I've been writing software professionally for over eight years. Through the NoSQL hype, the microservices craze, the blockchain detour. I've learned to be skeptical of anything that promises to "change everything." So when AI coding assistants started making noise, I watched from the sidelines longer than most.

Then I actually used them for a full sprint.

## What Changed (And What Didn't)

The honest answer is: AI tools didn't make me 10x faster. But they did eliminate a specific kind of friction that I didn't realize was draining me. The friction of *starting*.

Blank-file paralysis is real. Setting up a new form schema, writing the boilerplate for a new API route, remembering the exact signature of a rarely-used library method. These things aren't hard, but they interrupt flow. Having an assistant that handles the scaffolding means I spend more time in the part of the work I actually care about: the architecture decisions, the edge cases, the user experience details.

## Where It's Actually Useful

At [CAPX](https://capx.com), I spend a lot of time building complex form workflows. Multi-step wizards with conditional branching, financial calculations, validation logic that varies by loan type. This is exactly the kind of work where AI shines:

- **Generating React Hook Form schemas** from a description of the fields and validation rules
- **Writing TypeScript types** for deeply nested API response shapes
- **Drafting unit tests** for pure functions, especially edge cases I might not have thought of

What it doesn't replace is understanding *why* the form works the way it does. When a client's compliance requirement means a field only appears for certain loan-to-value ratios, the AI can write the conditional, but I have to understand the business rule well enough to tell it what to write.

## The Real Skill Shift

The developers who are thriving with AI tools aren't the ones who use them most aggressively. They're the ones who know when *not* to use them. AI is confidently wrong in a way that's easy to miss when you're moving fast. It'll write you a perfectly structured PostgreSQL query that has a subtle N+1 problem. It'll suggest an AWS Lambda configuration that works in dev and fails at scale.

Your job is to be the person who catches that. Which means you still need to deeply understand what you're building.

## What I'm Watching

The tooling is evolving fast. A few things I'm paying attention to:

- **Agentic coding workflows**: tools that can not just suggest code but run it, observe the result, and iterate
- **Context-aware refactoring**: AI that understands your whole codebase, not just the file you have open
- **Test generation from user stories**: still early but the demos are promising

The engineers who'll be most valuable in five years aren't those who can write the most code. They're those who can make the best decisions about *what* to build and *why*. AI handles more of the *how* every day.

I'm not worried about that trade. I like the design problems more than the boilerplate anyway.
