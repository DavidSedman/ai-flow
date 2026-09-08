---
name: create-project-structure
disable-model-invocation: true
description: Creates project folder structure for documentation. Guides through project name, type selection (Delivery/Maintenance/Security/UI Optimizations), and generates the appropriate folder hierarchy with template files in the Projects directory.
---

# Create Project Structure

Creates the project folder structure for documentations to be used in the project.

**IMPORTANT**
- DO NOT COMMIT ANYTHING TO GIT.

## Process

### 1. Ask what the project name is.

Wait for user response before proceeding 

### 2. Ask what the project type is?

The choices are: 
  - Delivery, 
  - Maintenance, 
  - Security, 
  - User Interface Optimisations
Wait for user response before proceeding

### 3. Create the project folder 

The structure is created in the `Projects\<project type>\<project name>` folder.

### 4. Based on the project type, create the following folders:

- Delivery: 
  - Anylsis folder
    - Analysis.md
  - Profile folder
    - Profile.md
  - Work items folder
    - .gitkeep file

- Maintenance: 
  - Specification folder
    - Specification.md
  - Work items folder
    - .gitkeep file

- Security: 
  - Specification folder
    - Specification.md
  - Work items folder
    - .gitkeep file

- User Interface Optimisations: 
  - Specification folder
    - Specification.md
  - Work items folder
    - .gitkeep file

## Output

Summarise the work completed.
