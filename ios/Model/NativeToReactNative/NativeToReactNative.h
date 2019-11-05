//
//  NativeToReactNative.h
//  TSC_App
//
//  Created by Athira Krishnan on 15/01/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

NS_ASSUME_NONNULL_BEGIN

@interface NativeToReactNative : NSObject

+ (RCTRootView *)passingPropertiesToReactNative:(NSDictionary *)props jsCodeLocation:(NSURL *)jsCodeLocation lauchOptions:(NSDictionary *)launchOptions;

@end

NS_ASSUME_NONNULL_END
