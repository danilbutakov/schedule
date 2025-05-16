#!/bin/bash

echo "Исправляем проблемы с leveldb-library..."

# Проверяем, существует ли директория Pods
if [ ! -d "ios/Pods/leveldb-library" ]; then
  echo "Директория leveldb-library не найдена. Сначала запустите 'pod install'."
  exit 1
fi

# Создаем символические ссылки для решения проблемы с путями к заголовочным файлам
echo "Создаем символические ссылки для заголовочных файлов leveldb..."

# Переходим в директорию leveldb-library
cd ios/Pods/leveldb-library/db

# Создаем символические ссылки для всех .h файлов из корневой директории db
for file in *.h; do
  if [ ! -L "../$file" ]; then
    echo "Создаем символическую ссылку для $file"
    ln -sf "db/$file" "../$file"
  fi
done

# Возвращаемся в корневую директорию
cd ../../../..

# Исправляем проблему с expo-dev-menu-interface
echo "Исправляем проблему с expo-dev-menu-interface..."

# Создаем пустой файл для отключения dev-menu
mkdir -p ios/Pods/Headers/Private/expo-dev-menu-interface
touch ios/Pods/Headers/Private/expo-dev-menu-interface/DisableDevMenu.h

echo "Очищаем кэш Xcode..."
rm -rf ~/Library/Developer/Xcode/DerivedData/*
rm -rf ios/build

echo "Исправления завершены. Запустите 'pod install' для применения изменений." 