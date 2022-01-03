# react-native-starter
## feature/heavy-starter

```
react-native
typescript
react-navigation
redux
redux-saga
styled-components
stylelint
eslint
fastlane
bugsnag
codepush
apisauce
```

#### 앱 이름 변경

```shell
yarn global add react-native-rename

react-native-rename "App Name" -b com.jiggag.appname
```

#### Bugsnag 설정
#### fastlane 설정
```shell
sudo gem install fastlane -NV
```

#### codepush 설정
```shell
yarn global add appcenter-cli
yarn add react-native-code-push
```

```shell
# codepush app key
appcenter codepush deployment list -a jiggag/equal-ios -k
>>>> .env, .env.production에 설정

# codepush config secret
ios/RNStarter/Appcenter-Config.plist
>>>> codepush 프로젝트에서 가져온 AppSecret 설정
```
