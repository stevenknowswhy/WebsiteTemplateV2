#!/usr/bin/env bash
set -euo pipefail

echo "🔎 Running verification suite..."

# Quick mode: skip build, just run unit & console sweep
if [[ "${1:-}" == "--quick" ]]; then
  echo "🚀 Quick mode: typecheck → lint → unit → console sweep"
  npm run typecheck
  npm run lint
  npm run test -- --passWithNoTests
  npm run verify:e2e
  echo "✅ Quick verification complete."
  exit 0
fi

# Full mode
echo "🏗️  Step 1: Typechecking & Linting"
npm run typecheck
npm run lint

echo "🧪 Step 2: Unit tests"
npm run test -- --passWithNoTests

echo "🚀 Step 3: Build"
npm run build

echo "🌐 Step 4: Start server for console sweep"
# Use a random free port
PORT=3001
export PORT
export NODE_ENV=production

# Start server in background
npm run dev > .artifacts/server.log 2>&1 &
SERVER_PID=$!

# Function to kill server on exit
cleanup() {
  if [[ -n "${SERVER_PID:-}" ]]; then
    kill "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

# Wait for server to be ready
echo "⏳ Waiting for server on port $PORT..."
timeout 30 bash -c "until curl -s http://localhost:$PORT > /dev/null; do sleep 1; done"
if ! curl -s http://localhost:$PORT > /dev/null; then
  echo "❌ Server failed to start within 30 seconds"
  cat .artifacts/server.log
  exit 1
fi
echo "✅ Server is ready"

echo "🔍 Step 5: Console & Accessibility sweep"
npm run verify:e2e || {
  echo "❌ Console sweep failed"
  cat .artifacts/server.log
  exit 1
}

echo "🎉 Full verification passed!"
echo "📁 Logs and artifacts saved to .artifacts/"
ls -la .artifacts/