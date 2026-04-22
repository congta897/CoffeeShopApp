export const imageAssets = {
  onboardingBanner: require('../../assets/onboarding_screen_coffee_banner.png'),
  homePromoBackground: require('../../assets/home_screen_backgound.png'),
  deliveryMap: require('../../assets/delivery_map.png'),
  deliveryDriver: require('../../assets/delivery_driver.png'),
  products: {
    'caffe-mocha': require('../../assets/home_screen_caffe_mocha.png'),
    'flat-white': require('../../assets/home_screen_flat_white.png'),
    'caramel-brew': require('../../assets/home_screen_unknown_coffee_1.png'),
    'classic-latte': require('../../assets/home_screen_unknown_coffee_2.png'),
  },
};

export function getProductImage(imageKey) {
  return imageAssets.products[imageKey] ?? imageAssets.products['caffe-mocha'];
}
