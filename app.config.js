const versionNum = "1.4.1";
const versionCode = 13;

module.exports = {
  expo: {
    name: "Divide & De-Stress",
    slug: "DivideDeStress",
    platforms: [
      "ios",
      "android"
    ],
    description: "A task management app for those projects that need a little effort on a regular basis. Ideal for students managing long-term assignments, or avid readers trying to hit a monthly goal.",
    version: versionNum,
    orientation: "portrait",
    icon: "./assets/images/icon_words.png",
    primaryColor: "#409AB5",
    notification: {
      icon: "./assets/images/white_icon.png"
    },
    scheme: "dividedestress",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#000000"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.buddingapps.dividedestress",
      buildNumber: versionNum
    },
    android: {
      package: "com.buddingapps.divide_destress",
      versionCode: versionCode,
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon_words.png",
        backgroundColor: "#000"
      }
    },
    extra: {
      eas: {
        projectId: "689f619e-4c01-41a4-a2d1-419e90c46ca4"
      }
    }
  },
  "react-native-google-mobile-ads": {
      android_app_id: "ca-app-pub-4985866248559217~8464918921",
      ios_app_id: "ca-app-pub-4985866248559217~9454900107"
  }
}
