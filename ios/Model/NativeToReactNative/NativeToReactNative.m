//
//  NativeToReactNative.m
//  TSC_App
//
//  Created by Athira Krishnan on 15/01/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "NativeToReactNative.h"

@implementation NativeToReactNative

+ (RCTRootView *)passingPropertiesToReactNative:(NSDictionary *)props jsCodeLocation:(NSURL *)jsCodeLocation lauchOptions:(NSDictionary *)launchOptions {
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:[[[NSBundle mainBundle] infoDictionary] objectForKey:(id)kCFBundleNameKey]
                                                 initialProperties:props
                                                     launchOptions:launchOptions];
    return rootView;
}

@end
