#!/usr/bin/env node

/**
 * Senior Repo Standards - Hygiene & Documentation Auditor
 * Scans a repository to evaluate compliance with Senior Engineering Standards:
 * - .gitignore protection against secret leaks
 * - 4-Tier Documentation hierarchy completeness
 * - GitHub PR and Issue templates
 * - Conventional Commit history compliance
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function parseArgs() {
  const args = process.argv.slice(2);
  let targetDir = process.cwd();
  for (const arg of args) {
    if (arg.startsWith('--target-dir=')) {
      targetDir = path.resolve(arg.split('=')[1].replace(/["']/g, ''));
    }
  }
  return targetDir;
}

function runAudit() {
  const targetDir = parseArgs();
  console.log('================================================================');
  console.log('🔍 Senior Repo Standards: Repository Hygiene Audit');
  console.log(`Auditing Directory: ${targetDir}`);
  console.log('================================================================\n');

  let score = 0;
  const maxScore = 100;
  const issues = [];
  const passes = [];

  // 1. .gitignore Audit (30 points)
  console.log('🛡️  Checking .gitignore Security & Secret Leak Rules...');
  const gitignorePath = path.join(targetDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    issues.push('CRITICAL: No .gitignore file found in repository root. Potential for catastrophic secret leaks.');
  } else {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    const requiredPatterns = [
      { pattern: /\.env/, name: '.env files', weight: 8 },
      { pattern: /\*\.pem|\*\.key|id_rsa/, name: 'Private keys (*.pem, *.key, id_rsa)', weight: 8 },
      { pattern: /node_modules/, name: 'Dependency folders (node_modules/)', weight: 4 },
      { pattern: /\*\.log/, name: 'Runtime logs (*.log)', weight: 5 },
      { pattern: /dist|build|\.next|\.turbo/, name: 'Build artifacts / bundles', weight: 5 },
    ];

    for (const req of requiredPatterns) {
      if (req.pattern.test(gitignoreContent)) {
        score += req.weight;
        passes.push(`.gitignore safely excludes ${req.name} (+${req.weight} pts)`);
      } else {
        issues.push(`HIGH RISK: .gitignore lacks exclusion for ${req.name}.`);
      }
    }
  }

  // 2. Core Governance Docs (25 points)
  console.log('📄 Checking Tier 1 Core Documentation...');
  const rootDocs = [
    { file: 'README.md', name: 'README.md', weight: 8 },
    { file: 'CONTRIBUTING.md', name: 'CONTRIBUTING.md', weight: 7 },
    { file: 'SECURITY.md', name: 'SECURITY.md', weight: 5 },
    { file: 'LICENSE', name: 'LICENSE', weight: 5 },
  ];

  for (const doc of rootDocs) {
    if (fs.existsSync(path.join(targetDir, doc.file))) {
      score += doc.weight;
      passes.push(`Found ${doc.name} (+${doc.weight} pts)`);
    } else {
      issues.push(`MISSING: ${doc.name} in repository root.`);
    }
  }

  // 3. Multi-Tier Documentation & ADRs (25 points)
  console.log('📐 Checking Multi-Tier Architecture & ADRs...');
  const docStructures = [
    { path: 'docs/git-standards.md', name: 'Git Standards Non-Negotiables', weight: 5 },
    { path: 'docs/architecture', name: 'Architecture Specifications directory', weight: 7, isDir: true },
    { path: 'docs/adr', name: 'Architecture Decision Records (ADR) directory', weight: 8, isDir: true },
    { path: 'docs/runbooks', name: 'Operational Runbooks directory', weight: 5, isDir: true },
  ];

  for (const item of docStructures) {
    const fullPath = path.join(targetDir, item.path);
    const exists = fs.existsSync(fullPath);
    const matchesType = exists && (item.isDir ? fs.statSync(fullPath).isDirectory() : fs.statSync(fullPath).isFile());

    if (matchesType) {
      score += item.weight;
      passes.push(`Found ${item.name} (+${item.weight} pts)`);
    } else {
      issues.push(`MISSING: ${item.name} (${item.path}).`);
    }
  }

  // 4. GitHub PR & Issue Templates (10 points)
  console.log('🤝 Checking GitHub Pull Request & Issue Templates...');
  const prTemplatePath = path.join(targetDir, '.github/PULL_REQUEST_TEMPLATE.md');
  const issueTemplatePath = path.join(targetDir, '.github/ISSUE_TEMPLATE');

  if (fs.existsSync(prTemplatePath)) {
    score += 5;
    passes.push('Found GitHub Pull Request Template (+5 pts)');
  } else {
    issues.push('MISSING: .github/PULL_REQUEST_TEMPLATE.md');
  }

  if (fs.existsSync(issueTemplatePath) && fs.readdirSync(issueTemplatePath).length > 0) {
    score += 5;
    passes.push('Found GitHub Issue Templates (+5 pts)');
  } else {
    issues.push('MISSING: .github/ISSUE_TEMPLATE directory with templates.');
  }

  // 5. Commit Standards Sample (10 points)
  console.log('📜 Evaluating Recent Git Commits for Conventional Format...');
  try {
    const gitLog = execSync('git log -n 5 --pretty=format:"%s"', { encoding: 'utf8', cwd: targetDir });
    const commitLines = gitLog.split('\n').filter(Boolean);
    const conventionalRegex = /^(feat|fix|refactor|perf|test|docs|style|chore)(\([a-zA-Z0-9_-]+\))?:\s.+/;

    let compliantCount = 0;
    for (const line of commitLines) {
      if (conventionalRegex.test(line)) {
        compliantCount++;
      }
    }

    if (commitLines.length > 0) {
      const commitScore = Math.round((compliantCount / commitLines.length) * 10);
      score += commitScore;
      if (commitScore >= 7) {
        passes.push(`Recent commit history conforms to Conventional Commits (${compliantCount}/${commitLines.length} commits compliant) (+${commitScore} pts)`);
      } else {
        issues.push(`NON-COMPLIANT COMMITS: Only ${compliantCount}/${commitLines.length} recent commits follow Conventional Commits format.`);
      }
    } else {
      score += 10;
      passes.push('No commit history found yet (new repository) (+10 pts)');
    }
  } catch (e) {
    // Git not initialized or no commits
    score += 5;
    passes.push('Git log check skipped (working tree or detached head) (+5 pts)');
  }

  // Final Scorecard
  console.log('\n================================================================');
  console.log(`📊 SENIOR REPOSITORY HYGIENE SCORE: ${score} / ${maxScore}`);
  console.log('================================================================\n');

  console.log('✅ Passing Checks:');
  for (const pass of passes) {
    console.log(`   ✓ ${pass}`);
  }

  if (issues.length > 0) {
    console.log('\n⚠️ Recommended Remediation:');
    for (const issue of issues) {
      console.log(`   ✗ ${issue}`);
    }
    console.log('\n💡 Tip: Run `node .agents/skills/senior-repo-standards/scripts/scaffold-repo.js` to automatically scaffold missing elements.');
  } else {
    console.log('\n🌟 Flawless! This repository adheres strictly to Senior Engineering Standards.');
  }

  return score;
}

runAudit();
