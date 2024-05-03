import * as React from 'react';

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

export default function MyAdBar() {
    return <BannerAd
        unitId={TestIds.BANNER}
        sizes={[BannerAdSize.FULL_BANNER]}
        requestOptions={{
            requestNonPersonalizedAdsOnly: true,
        }}
    />
}