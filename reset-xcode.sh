#!/bin/bash

echo "Закрываем все экземпляры Xcode"
killall Xcode || true

echo "Очищаем кэш сборки Xcode"
xcrun -k 
rm -rf ~/Library/Developer/Xcode/DerivedData
rm -rf ~/Library/Caches/com.apple.dt.Xcode

echo "Очищаем проект"
cd ios
xcodebuild -alltargets clean
rm -rf build
rm -rf Pods
rm -rf Podfile.lock
rm -rf Schedulle.xcworkspace
cd ..

echo "Сбрасываем настройки Xcode"
defaults delete com.apple.dt.Xcode || true
defaults delete com.apple.dt.XCBuild || true

echo "Сбрасываем службы индексации Xcode"
rm -rf ~/Library/Developer/Xcode/DerivedData/ModuleCache.noindex
rm -rf ~/Library/Developer/Xcode/DerivedData/Index.noindex

echo "Удаляем кэши и временные файлы Xcode"
rm -rf ~/Library/Developer/Xcode/iOS\ DeviceSupport/*
find ~/Library/Developer/Xcode/Archives -name "*.xcarchive" -type d -mtime +30 -delete || true

# Делаем скрипт исправления leveldb исполняемым, если он существует
if [ -f "./fix-leveldb.sh" ]; then
  chmod +x ./fix-leveldb.sh
fi

echo "Сброс Xcode завершен. Теперь запустите скрипт update-dependencies.sh" 