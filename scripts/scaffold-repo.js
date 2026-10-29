#!/usr/bin/env node

/**
 * Senior Repo Standards - Scaffolding Runner
 * Zero-dependency CLI script to scaffold enterprise-grade repository documentation,
 * GitHub issue/PR templates, ADR frameworks, and hardened .gitignore.
 */

const fs = require('fs');
const path = require('path');

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    projectName: 'Enterprise Platform',
    orgName: 'acme-corp',
    repoName: 'platform-core',
    domain: 'example.com',
    targetDir: process.cwd(),
    force: false,
  };

  for (const arg of args) {
    if (arg.startsWith('--project-name=')) {
      options.projectName = arg.split('=')[1].replace(/["']/g, '');
    } else if (arg.startsWith('--org-name=')) {
      options.orgName = arg.split('=')[1].replace(/["']/g, '');
    } else if (arg.startsWith('--repo-name=')) {
      options.repoName = arg.split('=')[1].replace(/["']/g, '');
    } else if (arg.startsWith('--domain=')) {
      options.domain = arg.split('=')[1].replace(/["']/g, '');
    } else if (arg.startsWith('--target-dir=')) {
      options.targetDir = path.resolve(arg.split('=')[1].replace(/["']/g, ''));
    } else if (arg === '--force') {
      options.force = true;
    }
  }

  return options;
}

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function interpolate(content, vars) {
  return content
    .replace(/\{\{PROJECT_NAME\}\}/g, vars.projectName)
    .replace(/\{\{PROJECT_DESCRIPTION\}\}/g, `${vars.projectName} is a resilient, enterprise-grade cloud system built with high availability and developer ergonomics.`)
    .replace(/\{\{ORG_NAME\}\}/g, vars.orgName)
    .replace(/\{\{REPO_NAME\}\}/g, vars.repoName)
    .replace(/\{\{DOMAIN\}\}/g, vars.domain)
    .replace(/\{\{DATE\}\}/g, new Date().toISOString().split('T')[0])
    .replace(/\{\{NUMBER\}\}/g, '000')
    .replace(/\{\{TITLE\}\}/g, 'Architecture Decision Record Template')
    .replace(/\{\{AUTHORS\}\}/g, 'Core Engineering Team')
    .replace(/\{\{DECIDERS\}\}/g, 'Lead Engineers')
    .replace(/\{\{ISSUE_OR_TICKET_URL\}\}/g, 'N/A');
}

function copyOrScaffold(srcPath, destPath, vars, force) {
  if (fs.existsSync(destPath) && !force) {
    console.log(`  [SKIPPED] ${path.relative(vars.targetDir, destPath)} (already exists, use --force to overwrite)`);
    return false;
  }
  const content = fs.readFileSync(srcPath, 'utf8');
  const interpolated = interpolate(content, vars);
  ensureDirSync(path.dirname(destPath));
  fs.writeFileSync(destPath, interpolated, 'utf8');
  console.log(`  [CREATED] ${path.relative(vars.targetDir, destPath)}`);
  return true;
}

function run() {
  const options = parseArgs();
  const templatesDir = path.resolve(__dirname, '../resources/templates');

  console.log('================================================================');
  console.log('🚀 Senior Repo Standards: Automated Scaffolding Engine');
  console.log(`Target Directory: ${options.targetDir}`);
  console.log(`Project: ${options.projectName} (${options.orgName}/${options.repoName})`);
  console.log('================================================================\n');

  if (!fs.existsSync(templatesDir)) {
    console.error(`Error: Templates directory not found at ${templatesDir}`);
    process.exit(1);
  }

  // 1. Root files
  console.log('📁 Scaffolding Root Standards & Governance...');
  copyOrScaffold(
    path.join(templatesDir, 'gitignore-universal.template'),
    path.join(options.targetDir, '.gitignore'),
    options,
    options.force
  );
  copyOrScaffold(
    path.join(templatesDir, 'README.template.md'),
    path.join(options.targetDir, 'README.md'),
    options,
    options.force
  );
  copyOrScaffold(
    path.join(templatesDir, 'CONTRIBUTING.template.md'),
    path.join(options.targetDir, 'CONTRIBUTING.md'),
    options,
    options.force
  );
  copyOrScaffold(
    path.join(templatesDir, 'SECURITY.template.md'),
    path.join(options.targetDir, 'SECURITY.md'),
    options,
    options.force
  );

  const licenseContent = `MIT License

Copyright (c) ${new Date().getFullYear()} ${options.projectName} Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;
  const licensePath = path.join(options.targetDir, 'LICENSE');
  if (!fs.existsSync(licensePath) || options.force) {
    fs.writeFileSync(licensePath, licenseContent, 'utf8');
    console.log(`  [CREATED] LICENSE`);
  }

  // 2. Documentation hierarchy
  console.log('\n📁 Scaffolding Multi-Tier Documentation Architecture...');
  copyOrScaffold(
    path.join(templatesDir, 'git-standards.template.md'),
    path.join(options.targetDir, 'docs/git-standards.md'),
    options,
    options.force
  );
  copyOrScaffold(
    path.join(templatesDir, 'ADR-000-template.md'),
    path.join(options.targetDir, 'docs/adr/ADR-000-template.md'),
    options,
    options.force
  );

  // Initial ADR README index
  const adrIndexContent = `# Architecture Decision Records (ADRs)

This directory contains records of architecturally significant decisions for ${options.projectName}.

## ADR Index

| ADR | Title | Status | Date |
|---|---|---|---|
| [ADR-000](./ADR-000-template.md) | Architecture Decision Record Template | Template | ${new Date().toISOString().split('T')[0]} |
`;
  const adrIndexPath = path.join(options.targetDir, 'docs/adr/README.md');
  if (!fs.existsSync(adrIndexPath) || options.force) {
    ensureDirSync(path.dirname(adrIndexPath));
    fs.writeFileSync(adrIndexPath, adrIndexContent, 'utf8');
    console.log(`  [CREATED] docs/adr/README.md`);
  }

  // Architecture stubs
  const archFiles = [
    {
      file: 'docs/architecture/system-design.md',
      title: 'System Design & Component Topology',
    },
    {
      file: 'docs/architecture/data-model.md',
      title: 'Data Models & Entity-Relationship Schemas',
    },
    {
      file: 'docs/architecture/security-and-rbac.md',
      title: 'Security Architecture & Role-Based Access Control',
    },
  ];

  for (const arch of archFiles) {
    const filePath = path.join(options.targetDir, arch.file);
    if (!fs.existsSync(filePath) || options.force) {
      ensureDirSync(path.dirname(filePath));
      fs.writeFileSync(
        filePath,
        `# ${arch.title}\n\n*Status*: Living Architecture Specification\n\n## Overview\nDocument system boundaries, communication topologies, and design specifications here.\n`,
        'utf8'
      );
      console.log(`  [CREATED] ${arch.file}`);
    }
  }

  // Runbook stub
  const runbookPath = path.join(options.targetDir, 'docs/runbooks/deployment-verification.md');
  if (!fs.existsSync(runbookPath) || options.force) {
    ensureDirSync(path.dirname(runbookPath));
    fs.writeFileSync(
      runbookPath,
      `# Deployment Verification Runbook\n\nStep-by-step smoke test and verification instructions for production releases.\n\n## Verification Checklist\n- [ ] Healthcheck responds HTTP 200: \`curl -f https://${options.domain}/api/health\`\n- [ ] Database migrations executed cleanly.\n- [ ] Background workers consuming queues without stall errors.\n`,
      'utf8'
    );
    console.log(`  [CREATED] docs/runbooks/deployment-verification.md`);
  }

  // 3. GitHub Templates
  console.log('\n📁 Scaffolding GitHub PR & Issue Templates...');
  copyOrScaffold(
    path.join(templatesDir, 'PULL_REQUEST_TEMPLATE.md'),
    path.join(options.targetDir, '.github/PULL_REQUEST_TEMPLATE.md'),
    options,
    options.force
  );
  copyOrScaffold(
    path.join(templatesDir, 'issue-templates/bug_report.md'),
    path.join(options.targetDir, '.github/ISSUE_TEMPLATE/bug_report.md'),
    options,
    options.force
  );
  copyOrScaffold(
    path.join(templatesDir, 'issue-templates/feature_request.md'),
    path.join(options.targetDir, '.github/ISSUE_TEMPLATE/feature_request.md'),
    options,
    options.force
  );

  console.log('\n✨ Scaffolding complete! Your repository now conforms to Senior Engineering Standards.');
}

run();
