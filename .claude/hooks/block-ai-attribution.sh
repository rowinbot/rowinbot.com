#!/bin/bash
# Block any git commit that contains AI attribution trailer lines.
# Catches the actual trailer format, not just mentions of the phrase.

COMMAND=$(cat | jq -r '.tool_input.command // empty')

if [ -z "$COMMAND" ]; then
  exit 0
fi

# Check if this is a git commit command
if ! echo "$COMMAND" | grep -qi 'git commit'; then
  exit 0
fi

# Block actual AI attribution trailers (the "Key: Value" format at end of commit msg)
# Matches lines like "Co-Authored-By: Claude <noreply@anthropic.com>"
# or "Generated with Claude Code" as a standalone credit line
if echo "$COMMAND" | grep -qiP '(co-authored-by:\s*.*\b(claude|anthropic|ai|gpt|copilot)\b|generated with \[?claude|noreply@anthropic\.com)'; then
  jq -n '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: "BLOCKED: No AI attribution trailers in commits. Remove Co-Authored-By and AI credit lines."
    }
  }'
else
  exit 0
fi
