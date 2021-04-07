export API_KEY=$(sed -n 's/BUGSNAG_API_KEY=//p' .env.production)
export CODE_PUSH_BUNDLE_ID=$(sed -n 's/\"codeBundleId\": \"//p' package.json)
CODE_PUSH_BUNDLE_ID=$(echo $CODE_PUSH_BUNDLE_ID | sed 's/\",//g')

node_modules/react-native/scripts/compose-source-maps.js \
  build/android/CodePush/index.android.bundle.map \
  build/android/CodePush/index.android.bundle.hbc.map \
  -o build/android/CodePush/index.android.bundle.composed.map

bugsnag-source-maps upload-react-native \
  --api-key $API_KEY \
  --code-bundle-id $CODE_PUSH_BUNDLE_ID \
  --platform android \
  --source-map build/android/CodePush/index.android.bundle.composed.map \
  --bundle build/android/CodePush/index.android.bundle
