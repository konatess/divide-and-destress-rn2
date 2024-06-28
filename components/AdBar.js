import * as React from 'react';
import { Platform } from 'react-native';

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

// const prodAdId = Platform.OS === 'ios' ? process.env.GAM_ID_IOS : process.env.GAM_ID_ANDROID
const prodAdId = Platform.OS === 'ios' ? "ca-app-pub-4985866248559217~9454900107" : "ca-app-pub-4985866248559217~8464918921"

const adUnitId = __DEV__ ? TestIds.BANNER : prodAdId;

export default function MyAdBar() {
    return <BannerAd
        unitId={adUnitId}
        sizes={[BannerAdSize.FULL_BANNER]}
        requestOptions={{
            requestNonPersonalizedAdsOnly: true,
        }}
    />
}