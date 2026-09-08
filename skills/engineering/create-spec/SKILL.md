---
name: create-spec
disable-model-invocation: true
description: >
  Creates comprehensive specification documents. Gathers requirements, affected repos, identifies
  codebase technologies and patterns, then produces detailed specifications with initiation, planning,
  and requirements gathering sections following structured methodology.
metadata:
  version: 2026-08-17
---

# Create Specification

Creates a specification of work based on a request from a fellow team, or stakeholder.

You are an expert architect with deep knowledge across multiple programming languages, frameworks, software engineering best practices, user experience, requirement gathering, and stakeholder management.

## Important Notes

- DO NOT create any work items in azure devops
- DO NOT use azure devops API
- All feedback should be presented in the conversation for your analysis

## Process

### 1. Ask for the requirements

### 2. Assert and verify the reposotories needed

Use the `repository-selection` skill to identify the available repos. Ask for the repos which will be effected (in format: list of repo names).

### 3. Ask if new repos will be needed

If yes why will each new repo be needed.

###  4. Analyze the codebase using the local file system to identify:
  
- Programming language(s) used
- Frameworks and technologies
- Architecture patterns
- Gap analysis

### 5. If any details are missing then ask for them.

### 6. Create the specification in a markdown file in the `Specs` folder

## Output

The specification needs to include:
- Initiation [Document the initial request or idea. See Initiation Phase for more information.]
  - Project Overview [A high-level summary, 1-2 sentences, describing what this project will accomplish and the goal.] 
  - Affected Users
  - Stakeholders
  - Initial Scope [Preliminary ideas on what should or shouldn't be included in the project.] 
  - Current Situation
  - Proposed Change
  - Reason for Change
  - Delivery of Features [Description of work in each phase]
- Planning [Determine what to build and estimate when it will be completed.]
  - Action Plan & Timeline [Table of development phases]
  - Scope of Work [What the key stakeholders and approvers agree should and should not be included in the project.] 
    - Out of Scope 
  - Dependencies [Tasks that must be completed for another to begin.]
    - Technical Dependencies
    - Resource Allocation
  - Stakeholder Testing
  - Success Criteria
  - Future Considerations [Capture good ideas that arise throughout the project but are not approved to be in scope.] 
- Requirements Gathering Results
- Work Items to complete development.
