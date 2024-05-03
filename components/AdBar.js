import * as React from 'react';
import { Platform } from 'react-native';

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const prodAdId = Platform.OS === 'android' ? "ca-app-pub-4985866248559217~8464918921" : "ca-app-pub-4985866248559217~9454900107"

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