export API_KEY=$(sed -n 's/BUGSNAG_API_KEY=//p' .env.production)
export CODE_PUSH_BUNDLE_ID=$(sed -n 's/\"codeBundleId\": \"//p' package.json)
CODE_PUSH_BUNDLE_ID=$(echo $CODE_PUSH_BUNDLE_ID | sed 's/\",//g')

bugsnag-source-maps upload-react-native \
  --api-key $API_KEY \
  --code-bundle-id $CODE_PUSH_BUNDLE_ID \
  --platform ios \
  --source-map build/ios/CodePush/main.jsbundle.map \
  --bundle build/ios/CodePush/main.jsbundle
