# Contributing to Brand Messaging Helper

Thank you for your interest in contributing! This document explains how to contribute to this open-source project.

## Ways to Contribute

- 🐛 **Report bugs** - Found an issue? Let us know
- ✨ **Suggest features** - Have an idea? Share it
- 📖 **Improve docs** - Make the README clearer
- 🔧 **Submit code** - Fix bugs or add features
- 💬 **Answer questions** - Help others in issues/discussions

## Getting Started

### Fork and Clone

1. Fork this repository
2. Clone your fork:
```bash
git clone https://github.com/your-username/brand-messaging-helper.git
cd brand-messaging-helper
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment

```bash
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/app
  /api
    /chat         → Claude API integration (streaming)
    /config       → Serves config.json to frontend
  page.tsx        → Main chat UI
  useConfig.ts    → Client-side config hook
  layout.tsx      → Root layout
  globals.css     → Global styles

/content          → Brand guideline templates (markdown)

/lib
  brand-content.ts → Server-side: loads markdown files
  config.ts       → Server-side: loads config.json

config.json       → User customization (company, colors, etc.)
```

## Code Guidelines

### TypeScript

- Use TypeScript for all new code
- Avoid `any` - use proper types
- Export types when they're reused

### React

- Use functional components with hooks
- Keep components focused and small
- Use `'use client'` only when needed (for client-side state)

### Styling

- Use Tailwind CSS for styling
- Keep inline styles minimal (use for dynamic colors only)
- Follow responsive design patterns (mobile-first)

### API Routes

- Handle errors gracefully with clear messages
- Return proper HTTP status codes
- Log errors for debugging

### Example of Good Code

```typescript
// ✅ Good: Clear types, error handling, clean logic
export async function loadBrandContent(): Promise<string> {
  try {
    const contentDir = join(process.cwd(), 'content');
    const files = readdirSync(contentDir).filter(file => file.endsWith('.md'));

    if (files.length === 0) {
      return 'No brand guidelines configured.';
    }

    return files.map(file => {
      const content = readFileSync(join(contentDir, file), 'utf-8');
      return `# ${file}\n\n${content}`;
    }).join('\n\n---\n\n');
  } catch (error) {
    console.error('Error loading content:', error);
    return 'Error loading brand guidelines.';
  }
}
```

## Making Changes

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

- Write clear, focused commits
- Test your changes locally
- Update docs if needed

### 3. Test

```bash
# Run the dev server
npm run dev

# Build for production
npm run build

# Run the production build
npm start
```

**Manual Testing Checklist:**
- [ ] Chat interface loads and displays correctly
- [ ] Config customization works (colors, company name, etc.)
- [ ] Messages send and receive properly
- [ ] Streaming responses work
- [ ] Error states display correctly
- [ ] Mobile responsive design works
- [ ] Brand content loads from `/content` folder

### 4. Commit

Write clear commit messages:

```bash
# Good commit messages
git commit -m "Fix: Handle missing config.json gracefully"
git commit -m "Feature: Add support for custom system prompt"
git commit -m "Docs: Update README with deployment steps"

# Bad commit messages (avoid these)
git commit -m "fix stuff"
git commit -m "updates"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Pull Request Guidelines

### PR Title Format

- `Fix: [description]` - Bug fixes
- `Feature: [description]` - New features
- `Docs: [description]` - Documentation changes
- `Refactor: [description]` - Code refactoring
- `Style: [description]` - UI/styling changes

### PR Description

Include:
1. **What**: What does this PR do?
2. **Why**: Why is this change needed?
3. **How**: How does it work?
4. **Testing**: How did you test it?

**Example:**
```markdown
## What
Adds error handling when config.json is missing or invalid.

## Why
Users were seeing cryptic errors when config.json was misconfigured.

## How
- Added try/catch in config.ts
- Return default config on error
- Log error for debugging

## Testing
- Deleted config.json → app shows default config
- Invalid JSON in config.json → app shows default config
- Valid config.json → app shows custom config
```

## Feature Ideas

Want to contribute but not sure what to work on? Here are some ideas:

### Easy (Good First Issues)
- Add more example content templates
- Improve error messages
- Add loading states
- Write more tests
- Improve mobile UI

### Medium
- Add support for multiple languages (i18n)
- Add conversation history (localStorage)
- Add "copy to clipboard" for messages
- Add dark mode support
- Add markdown rendering in messages

### Advanced
- Add user authentication (NextAuth.js)
- Add usage tracking/analytics
- Add admin panel for managing content
- Add support for multiple brand guide "presets"
- Add image upload for visual guidelines

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what's best for the project
- Accept constructive criticism gracefully

## Questions?

- Open an issue with the "question" label
- Tag maintainers if you need help

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
