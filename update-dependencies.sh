#!/bin/bash

# Обновляем Expo и основные зависимости
echo "Обновляем Expo и основные зависимости"
yarn add expo

# Сначала удаляем node_modules и кэш
echo "Удаляем node_modules и очищаем кэш"
rm -rf node_modules
rm -rf yarn.lock
yarn cache clean

# Удаляем производные данные и кэш CocoaPods
echo "Удаляем производные данные Xcode и кэш CocoaPods"
rm -rf ~/Library/Developer/Xcode/DerivedData/Schedulle-*
rm -rf ios/Pods
rm -rf ios/Podfile.lock
rm -rf ios/build

# Отключаем скрипт Expo Configure в проекте Xcode
echo "Отключаем скрипт Expo Configure project в проекте Xcode"
sed -i '' 's/4C2B0A1E411AE2473E1C374C \/\* \[Expo\] Configure project \*\/ = {/4C2B0A1E411AE2473E1C374C \/\* \[Expo\] Configure project \*\/ = {\n\t\t\tenabled = 0;/g' ios/Schedulle.xcodeproj/project.pbxproj

# Обновляем Podfile
echo "Обновляем Podfile"
cat > ios/Podfile << EOL
require File.join(File.dirname(\`node --print "require.resolve('expo/package.json')"\`), "scripts/autolinking")
require File.join(File.dirname(\`node --print "require.resolve('react-native/package.json')"\`), "scripts/react_native_pods")

require 'json'
podfile_properties = JSON.parse(File.read(File.join(__dir__, 'Podfile.properties.json'))) rescue {}

ENV['RCT_NEW_ARCH_ENABLED'] = '0' if podfile_properties['newArchEnabled'] == 'false'
ENV['EX_DEV_CLIENT_NETWORK_INSPECTOR'] = podfile_properties['EX_DEV_CLIENT_NETWORK_INSPECTOR']
ENV['SWIFT_VERSION'] = '5.0'

platform :ios, podfile_properties['ios.deploymentTarget'] || '15.1'
install! 'cocoapods',
  :deterministic_uuids => false

use_frameworks! :linkage => :dynamic

prepare_react_native_project!

target 'Schedulle' do
  use_expo_modules!
  
  # Добавляем модульные заголовки для Firebase компонентов
  pod 'FirebaseCore', :modular_headers => true
  pod 'FirebaseCoreInternal', :modular_headers => true
  pod 'FirebaseAppCheckInterop', :modular_headers => true
  pod 'FirebaseAuthInterop', :modular_headers => true
  pod 'FirebaseCoreExtension', :modular_headers => true
  pod 'GTMSessionFetcher', :modular_headers => true
  pod 'GoogleUtilities', :modular_headers => true
  
  # Исправляем проблему с leveldb-library
  pod 'leveldb-library', :modular_headers => true, :path => './leveldb-library-fix'
  
  config = use_native_modules!

  use_react_native!(
    :path => config[:reactNativePath],
    :hermes_enabled => podfile_properties['expo.jsEngine'] == nil || podfile_properties['expo.jsEngine'] == 'hermes',
    :app_path => "#{Pod::Config.instance.installation_root}/..",
  )

  post_install do |installer|
    react_native_post_install(
      installer,
      config[:reactNativePath],
      :mac_catalyst_enabled => false
    )

    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        # Исключаем arm64 для симулятора
        config.build_settings['EXCLUDED_ARCHS[sdk=iphonesimulator*]'] = 'arm64'
        
        # Устанавливаем Swift 5.0
        config.build_settings['SWIFT_VERSION'] = '5.0'
        
        # Пути поиска для заголовочных файлов
        config.build_settings['HEADER_SEARCH_PATHS'] ||= ['$(inherited)']
        config.build_settings['HEADER_SEARCH_PATHS'] << '${PODS_ROOT}/Headers/Public/React-Core'
        config.build_settings['HEADER_SEARCH_PATHS'] << '${PODS_ROOT}/Headers/Public'
        
        # Добавляем путь к leveldb заголовкам
        if target.name == 'leveldb-library'
          config.build_settings['HEADER_SEARCH_PATHS'] << '${PODS_ROOT}/leveldb-library/'
          config.build_settings['CLANG_CXX_LANGUAGE_STANDARD'] = 'c++11'
        end
        
        # Исправление для expo-dev-menu-interface
        if target.name.start_with?('expo-dev-menu') || target.name.include?('EXDevMenu')
          config.build_settings['SWIFT_ACTIVE_COMPILATION_CONDITIONS'] ||= ['$(inherited)']
          config.build_settings['SWIFT_ACTIVE_COMPILATION_CONDITIONS'] << 'DISABLE_EXPO_DEV_MENU'
        end
      end
    end
  end
end
EOL

echo "Обновляем AppDelegate.h"
cat > ios/Schedulle/AppDelegate.h << EOL
#import <UIKit/UIKit.h>
#import <React/RCTBridgeDelegate.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
EOL

echo "Обновляем bridging header"
cat > ios/Schedulle/Schedulle-Bridging-Header.h << EOL
//
// Use this file to import your target's public headers that you would like to expose to Swift.
//

#import "React/RCTBridgeModule.h"
#import "React/RCTViewManager.h"
#import "React/RCTEventEmitter.h"
#import "React/RCTLog.h"
#import "React/RCTConvert.h"
EOL

# Переустанавливаем зависимости
echo "Устанавливаем зависимости"
yarn install --legacy-peer-deps

# Устанавливаем поды для iOS
echo "Устанавливаем поды для iOS"
cd ios && pod install && cd ..

# Запускаем скрипт исправления leveldb, если он существует
if [ -f "./fix-leveldb.sh" ]; then
  echo "Запускаем скрипт исправления leveldb"
  chmod +x ./fix-leveldb.sh
  ./fix-leveldb.sh
fi

echo "Обновление зависимостей завершено. Теперь вы можете открыть проект в Xcode и запустить его."
echo "Выполните следующую команду: open ios/Schedulle.xcworkspace" 