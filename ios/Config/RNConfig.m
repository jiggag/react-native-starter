#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wnullability-completeness"

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

@interface RCT_EXTERN_MODULE(RNConfig, NSObject)

RCT_EXTERN_METHOD(getAppVersion:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(getDeviceId:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(exitApp:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject);

@end

#pragma clang diagnostic pop
