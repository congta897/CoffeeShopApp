import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { imageAssets } from '../constants/assets';
import { colors } from '../constants/theme';

const beans = [
  { left: '14%', top: '8%', rotate: '22deg' },
  { left: '58%', top: '5%', rotate: '-18deg' },
  { left: '74%', top: '18%', rotate: '40deg' },
  { left: '24%', top: '24%', rotate: '-30deg' },
  { left: '40%', top: '16%', rotate: '16deg' },
  { left: '10%', top: '54%', rotate: '-12deg' },
  { left: '78%', top: '58%', rotate: '26deg' },
  { left: '30%', top: '70%', rotate: '-18deg' },
];

export default function OnboardingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ImageBackground
        source={imageAssets.onboardingBanner}
        resizeMode="cover"
        style={styles.hero}
      >
        <View style={styles.heroOverlay} />
        {beans.map((bean, index) => (
          <View
            key={index}
            style={[
              styles.bean,
              {
                left: bean.left,
                top: bean.top,
                transform: [{ rotate: bean.rotate }],
              },
            ]}
          />
        ))}
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.title}>Fall in Love with Coffee in Blissful Delight!</Text>
        <Text style={styles.subtitle}>
          Welcome to our cozy coffee corner, where every cup is a delightful for you.
        </Text>
        <Pressable style={styles.button} onPress={() => navigation.replace('MainTabs')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#090909',
  },
  hero: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  bean: {
    position: 'absolute',
    width: 14,
    height: 22,
    borderRadius: 14,
    backgroundColor: '#6A341A',
    opacity: 0.72,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 22,
    gap: 14,
    backgroundColor: '#090909',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 42,
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    height: 58,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F6C55C',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
