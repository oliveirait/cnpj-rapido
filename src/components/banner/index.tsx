import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const PUB_ID_BANNER: string = __DEV__ ? TestIds.BANNER : "ca-app-pub-2213444535919704/2360967313"


export function Banner () {

  return (

        <BannerAd
          unitId={PUB_ID_BANNER}
          size={BannerAdSize.MEDIUM_RECTANGLE}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />

  )
}


