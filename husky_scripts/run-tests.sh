#!/bin/bash

BASIC_RED="\e[0;31m"
BASIC_GREEN="\e[0;32m"
BASIC_YELLOW="\e[0;33m"
BASIC_CYAN="\e[0;36m"
ENDCOLOR="\e[0m"

echo -e "${BASIC_CYAN}🐶 Running tests before push...${ENDCOLOR}"

npx vitest run --coverage
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo -e "${BASIC_RED}❌ Tests failed! Push aborted.${ENDCOLOR}"
  echo -e "${BASIC_YELLOW}⚠️ Please fix the failing tests before pushing your code.${ENDCOLOR}"
  exit 1
fi

echo -e "${BASIC_GREEN}✅ All tests passed! Proceeding with push...${ENDCOLOR}"
