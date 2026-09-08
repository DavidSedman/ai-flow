---
name: clean-code
disable-model-invocation: true
description: Review code of any language line by line against the Clean Code principles of Robert C. Martin, covering naming, functions, SOLID, testing, concurrency, error handling, formatting and comments. Use for exhaustive code quality audits and refactoring assessments. Triggers when the user asks for a code review, a clean code analysis, or refactoring advice.
---

## Execution

For every file or code block under review, iterate through **each line/block** and evaluate it against **every principle** listed below. Do not spot-check — be exhaustive.

### Output Format

Produce a per-category report using this structure:

```
## Clean Code Report: <file or context>

### <Category>
| Principle | Status | Location | Detail |
|-----------|--------|----------|--------|
| <key>     | ✅ / ⚠️ | line(s)  | Brief explanation if violated |
```

- **✅**: Principle satisfied
- **⚠️**: Violation found — include location and a concise fix suggestion
- Omit rows where a principle is not applicable to the code under review
- After the table, provide a **Summary** with total violations count and top-priority fixes

---

## Principles

### Variables

- **meaningful-names**: Names must clearly convey intent. Readers should understand purpose without guessing.
- **pronounceable-names**: Names must be speakable. Avoid abbreviations that cannot be discussed verbally.
- **consistent-vocabulary**: Use one word per concept across the codebase. Do not mix synonyms for the same abstraction.
- **searchable-names**: Use named constants for magic numbers and strings. Avoid unnamed literals.
- **explanatory-variables**: Introduce intermediate variables to clarify complex expressions or destructured values.
- **no-mental-mapping**: Explicit names over single-letter or cryptic identifiers. Clarity over brevity.
- **no-unneeded-context**: Do not repeat class/type/module name in its member names.
- **default-arguments**: Use language-native default parameter values instead of conditional fallbacks.
- **enums-for-intent**: Use enums or named constants to document categorical intent rather than raw values.

### Functions

- **limit-parameters**: Prefer 2 or fewer parameters. Use object/struct destructuring for more.
- **single-responsibility**: Each function does exactly one thing.
- **descriptive-names**: Function name clearly describes what it does, not how.
- **single-abstraction-level**: All statements in a function operate at the same level of abstraction.
- **no-duplicate-code**: Extract shared logic into reusable abstractions. Never copy-paste.
- **no-side-effects**: Functions should be predictable. Isolate and centralise mutations.
- **no-flag-parameters**: Split behaviour into separate well-named functions instead of boolean switches.
- **favour-functional-style**: Prefer map/filter/reduce over imperative loops where the language supports it.
- **encapsulate-conditionals**: Extract complex boolean expressions into named functions or variables.
- **avoid-type-checking**: Use polymorphism or generics instead of runtime type checks.
- **remove-dead-code**: Delete unused functions, variables, and unreachable branches. Use version control.
- **set-default-objects**: Use language-native mechanisms to merge defaults instead of per-property fallbacks.

### Objects & Data Structures

- **use-accessors**: Access object data through getters/setters or equivalent encapsulation.
- **encapsulate-internals**: Hide implementation details. Expose behaviour, not state.

### Classes

- **modern-class-syntax**: Use the language's modern class/struct constructs over legacy patterns.
- **method-chaining**: Return `this`/`self` from mutating methods to enable fluent interfaces where idiomatic.
- **composition-over-inheritance**: Prefer "has-a" composition. Reserve inheritance for true "is-a" relationships.

### SOLID

- **single-responsibility (SRP)**: A class/module has only one reason to change.
- **open-closed (OCP)**: Open for extension, closed for modification. New behaviour via new code, not changed code.
- **liskov-substitution (LSP)**: Subtypes must be substitutable for their base types without altering correctness.
- **interface-segregation (ISP)**: No client should be forced to depend on methods it does not use. Keep interfaces focused.
- **dependency-inversion (DIP)**: Depend on abstractions, not concretions. High-level modules must not depend on low-level modules.

### Testing

- **tdd-laws**: No production code without a failing test. Only enough test to fail. Only enough code to pass.
- **first-rules**: Tests must be Fast, Independent, Repeatable, Self-Validating, and Timely.
- **single-concept-per-test**: Each test verifies one behaviour. One assertion per test where practical.
- **descriptive-test-names**: Test name states the scenario and expected outcome. A failing test name alone should explain what broke.

### Concurrency

- **prefer-async-patterns**: Use promises, futures, or language-native async constructs over raw callbacks.
- **use-async-await**: Prefer async/await (or equivalent) for readability over chained callbacks or .then() chains.

### Error Handling

- **use-proper-error-types**: Throw/return language-native error/exception types, not raw strings or arbitrary objects.
- **never-ignore-caught-errors**: Every catch block must handle or propagate the error meaningfully.
- **never-ignore-async-failures**: All async error paths (rejected promises, failed futures) must be handled.

### Formatting

- **consistent-capitalisation**: Follow one capitalisation convention per construct type (PascalCase for types, camelCase for variables, UPPER_SNAKE for constants, etc.).
- **caller-callee-proximity**: Keep calling functions vertically close to the functions they call.
- **organised-imports**: Group, alphabetise, and remove unused imports. Separate external from internal.
- **path-aliases**: Use module aliases or path mappings to avoid deep relative import paths.

### Comments

- **prefer-self-explanatory-code**: If code needs a comment to be understood, rewrite the code first.
- **no-commented-out-code**: Delete unused code. Version control preserves history.
- **no-journal-comments**: Do not maintain changelogs in source files. Use commit history.
- **no-positional-markers**: Do not use banner comments to delineate sections. Use structure instead.
- **todo-comments-acceptable**: TODO comments are permitted for known technical debt, but are not a substitute for good code.
