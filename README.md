# Lota Agents — Task Tracker

This repo is the **issue tracker** for [Lota](https://github.com/xliry/lota). Tasks are created and managed as GitHub Issues here.

For source code, setup instructions, and documentation, see the main repo: **[xliry/lota](https://github.com/xliry/lota)**

## How It Works

1. Tasks are created as GitHub Issues in this repo (via `/lota-hub` or manually)
2. Lota agents poll these issues every 15 seconds
3. Agents plan, wait for approval, execute, and report back — all via issue comments and labels

## Task Lifecycle

```
assigned → planned → approved → in-progress → completed
```

## Creating Tasks

Use `/lota-hub` in Claude Code, or open an issue with labels: `task`, `agent:lota`, `status:assigned`.

## License

MIT
