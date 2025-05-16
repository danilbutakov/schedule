#!/bin/bash

echo "Запускаем post-install скрипт..."

# Запускаем скрипт настройки автоматического запуска скриптов перед сборкой
if [ -f "./setup-xcode-build-phase.sh" ]; then
  echo "Настраиваем автоматический запуск скриптов перед сборкой"
  bash "./setup-xcode-build-phase.sh"
fi

# Если мы на macOS и есть скрипт prebuild-ios.sh, запускаем его
if [ "$(uname)" == "Darwin" ] && [ -f "./prebuild-ios.sh" ]; then
  echo "Запускаем скрипт предварительной сборки для iOS"
  bash "./prebuild-ios.sh"
fi

echo "Post-install скрипт завершен" 