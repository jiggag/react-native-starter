# react-native-starter

## feature/starter
- typescript
- kotlin
- swift
- eslint
- react-query
- react-navigation
- fastlane

## Firebase + Fastlane 앱 배포 준비
- Firebase 준비
  - 아래 경로에 파일 저장
    - `android/app/google-services.json`
    - `ios/RNStarter/GoogleService-Info.plist`
  - `iOS Development Provisioning` 발급
  - [문서: firebase + fastlane으로 배포하기](https://firebase.google.com/docs/app-distribution/android/distribute-fastlane?authuser=0)
  - [문서: firebase 로그인](https://firebase.google.com/docs/app-distribution/android/distribute-fastlane?authuser=0#google-acc-fastlane)
- 아래 내용의 환경변수 등록
  ```shell
  export FIREBASE_APP_ID_AOS="FIREBASE_APP_ID_AOS"
  export FIREBASE_APP_ID_IOS="FIREBASE_APP_ID_IOS"
  export FIREBASE_CLI_TOKEN="FIREBASE_CLI_TOKEN"
  export FIREBASE_TEST_GROUPS="FIREBASE_TEST_GROUPS"
  ```
  
------
## feature/heavy-starter
- [jiggag/react-native-**heavy**-starter](https://github.com/jiggag/react-native-starter/tree/feature/heavy-starter)
  - typescript
  - kotlin
  - swift
  - react-navigation
  - styled-components
  - redux
  - redux-saga
  - react-query
  - fastlane
  - bugsnag
  - codepush 
  - stylelint 
  - eslint
