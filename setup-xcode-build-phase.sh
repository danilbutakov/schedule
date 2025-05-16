#!/bin/bash

echo "Настраиваем автоматический запуск скриптов перед сборкой в Xcode..."

# Путь к файлу проекта Xcode
PROJECT_FILE="ios/Schedulle.xcodeproj/project.pbxproj"

# Проверяем, существует ли файл проекта
if [ ! -f "$PROJECT_FILE" ]; then
  echo "Ошибка: Файл проекта Xcode не найден: $PROJECT_FILE"
  exit 1
fi

# ID для новой фазы сборки (уникальный идентификатор)
SCRIPT_PHASE_ID="F1174843$(date +%s | cut -c1-8)"

# Проверяем, есть ли уже скрипт xcode-prebuild.sh в фазах сборки
if grep -q "xcode-prebuild.sh" "$PROJECT_FILE"; then
  echo "Скрипт xcode-prebuild.sh уже добавлен в фазы сборки проекта."
else
  # Находим строку, после которой нужно вставить новую фазу сборки
  LINE_NUMBER=$(grep -n "buildPhases = (" "$PROJECT_FILE" | head -n 1 | cut -d: -f1)
  
  if [ -z "$LINE_NUMBER" ]; then
    echo "Ошибка: Не удалось найти место для вставки фазы сборки в файле проекта."
    exit 1
  fi
  
  # Создаем временный файл для вставки новой фазы сборки
  TEMP_FILE=$(mktemp)
  
  # Копируем содержимое до строки LINE_NUMBER
  head -n "$LINE_NUMBER" "$PROJECT_FILE" > "$TEMP_FILE"
  
  # Добавляем новую фазу сборки
  cat >> "$TEMP_FILE" << EOL
				$SCRIPT_PHASE_ID /* [Custom] Xcode Prebuild Script */ = {
					isa = PBXShellScriptBuildPhase;
					buildActionMask = 2147483647;
					files = (
					);
					inputFileListPaths = (
					);
					inputPaths = (
					);
					name = "[Custom] Xcode Prebuild Script";
					outputFileListPaths = (
					);
					outputPaths = (
					);
					runOnlyForDeploymentPostprocessing = 0;
					shellPath = /bin/sh;
					shellScript = "bash \\"\\${PROJECT_DIR}/xcode-prebuild.sh\\"\\n";
				};
EOL
  
  # Копируем оставшуюся часть файла
  tail -n +$((LINE_NUMBER + 1)) "$PROJECT_FILE" >> "$TEMP_FILE"
  
  # Находим строку с buildPhases в секции PBXNativeTarget
  TARGET_LINE_NUMBER=$(grep -n "buildPhases = (" "$TEMP_FILE" | head -n 1 | cut -d: -f1)
  
  if [ -z "$TARGET_LINE_NUMBER" ]; then
    echo "Ошибка: Не удалось найти секцию buildPhases в файле проекта."
    rm "$TEMP_FILE"
    exit 1
  fi
  
  # Создаем еще один временный файл для добавления ссылки на фазу сборки
  TEMP_FILE2=$(mktemp)
  
  # Копируем содержимое до строки TARGET_LINE_NUMBER + 1
  head -n $((TARGET_LINE_NUMBER + 1)) "$TEMP_FILE" > "$TEMP_FILE2"
  
  # Добавляем ссылку на новую фазу сборки
  echo "					$SCRIPT_PHASE_ID /* [Custom] Xcode Prebuild Script */," >> "$TEMP_FILE2"
  
  # Копируем оставшуюся часть файла
  tail -n +$((TARGET_LINE_NUMBER + 2)) "$TEMP_FILE" >> "$TEMP_FILE2"
  
  # Заменяем оригинальный файл
  mv "$TEMP_FILE2" "$PROJECT_FILE"
  
  # Удаляем временный файл
  rm "$TEMP_FILE"
  
  echo "Скрипт xcode-prebuild.sh успешно добавлен в фазы сборки проекта Xcode."
fi

echo "Настройка автоматического запуска скриптов завершена." 