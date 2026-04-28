Run `git diff --staged` to see what's staged. If nothing is staged, run `git diff HEAD` instead.

Generate a conventional commit message based on the changes:

Format: `type(scope): short message`

Types: feat, fix, refactor, chore, docs, style
Scope: component name or area (e.g. UiButton, navbar, gsap)
Message: max 10 words, lowercase, imperative, English

Then run the commit with that message.
