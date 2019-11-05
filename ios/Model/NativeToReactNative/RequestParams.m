//
//  RequestParams.m
//  Tsc_Poc_Workbench
//
//  Created by Athira Krishnan on 30/01/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RequestParams.h"
#import "AppDelegate.h"

@implementation RequestParams

+ (NSDictionary *)passInitialNativeProperties {
    NSString * buildVersion = [NSString stringWithFormat:@"%@_%@",[[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"],[[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleVersion"]];
    NSDictionary *props = @{ @"context" : @"initialize",
                 @"data" : @{
                     @"applicationVersion" : buildVersion
                     }
                 };
    return props;
}

@end
