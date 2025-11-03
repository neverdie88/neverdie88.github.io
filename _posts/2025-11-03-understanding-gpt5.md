---
layout: default
title: "Understanding GPT5"
date: 2025-11-03
---

GPT-5 represents a new generation of large language models focused on stronger reasoning, better tool use, and safer, more reliable behavior. This post outlines what it is good at, where it can struggle, and how to get strong results with practical prompting tips.

## What makes GPT-5 different
- Improved multi-step reasoning: Better at carrying state across steps, decomposing tasks, and checking its own work.
- Tool-use and orchestration: More reliable at calling external tools (search, code execution, data retrieval) when available.
- Longer context handling: Works with larger inputs and maintains coherence across longer sessions.
- Safer defaults: Calibrated responses, tighter refusal behavior for risky queries, and better adherence to instructions.

## Strengths
- Complex planning and structured output (JSON, tables, code stubs)
- Code reasoning and refactoring across multiple files
- Summarization and synthesis over long documents
- Querying heterogeneous data and producing concise, accurate answers

## Limitations to keep in mind
- Hallucinations remain possible (especially on niche facts)
- Can over-generalize without concrete constraints/examples
- Performance depends on clear instructions and representative examples
- Latency and cost can be higher for long-context or multi-step tasks

## Prompting tips
- State objectives and constraints explicitly
- Provide examples (few-shot) for the desired output format
- Ask for step-by-step plans, then the final answer
- Use structured output (fields/keys) when you plan to parse results
- Encourage verification: “validate assumptions,” “list uncertainties”

## Example prompt
```
You are assisting with a code review.
- Goal: Identify risky changes and missing tests
- Constraints: Only comment on files under src/
- Output: JSON array with {file, risk_level, comments[]}

Steps:
1) Scan diffs in src/
2) Flag high-risk changes (security, data handling)
3) Propose at least one test per risk

Now produce the JSON only.
```

## References and further reading
- OpenAI system cards and safety notes
- Research posts on chain-of-thought, tool-use, and self-reflection
- Responsible AI guidelines for evaluation and testing

If you have questions or suggestions for future posts, check the About page.
