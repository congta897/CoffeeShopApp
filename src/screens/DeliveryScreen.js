import { Feather, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { imageAssets } from '../constants/assets';
import { colors, shadow } from '../constants/theme';
import appData from '../data/data.json';

const progressSteps = [1, 1, 1, 0];

export default function DeliveryScreen({ navigation, route }) {
  const selectedProduct =
    appData.products.find(
      (item) => item.id === (route.params?.productId ?? appData.order.defaultItemId)
    ) ?? appData.products[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ImageBackground source={imageAssets.deliveryMap} resizeMode="cover" style={styles.mapArea}>
        <View style={styles.topBar}>
          <Pressable style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color={colors.text} />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Feather name="navigation" size={18} color={colors.text} />
          </Pressable>
        </View>
      </ImageBackground>

      <View style={[styles.bottomSheet, shadow]}>
        <Text style={styles.etaText}>{appData.delivery.etaMinutes} minutes left</Text>
        <Text style={styles.destinationText}>
          Delivery to <Text style={styles.destinationStrong}>{appData.delivery.destination}</Text>
        </Text>

        <View style={styles.progressTrack}>
          {progressSteps.map((step, index) => (
            <View
              key={index}
              style={[styles.progressStep, step ? styles.progressStepActive : styles.progressStepIdle]}
            />
          ))}
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Ionicons name="bag-handle-outline" size={18} color={colors.primary} />
          </View>
          <View style={styles.statusCopy}>
            <Text style={styles.statusTitle}>{appData.delivery.statusTitle}</Text>
            <Text style={styles.statusMessage}>{appData.delivery.statusMessage}</Text>
          </View>
        </View>

        <View style={styles.courierCard}>
          <View style={styles.avatar}>
            <Image source={imageAssets.deliveryDriver} style={styles.avatarImage} />
          </View>
          <View style={styles.courierCopy}>
            <Text style={styles.courierName}>{appData.delivery.courier.name}</Text>
            <Text style={styles.courierRole}>
              {appData.delivery.courier.role} for {selectedProduct.name}
            </Text>
          </View>
          <Pressable style={styles.phoneButton}>
            <Feather name="phone-call" size={18} color={colors.primary} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2EEE8',
  },
  mapArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheet: {
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: -160,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  etaText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  destinationText: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  destinationStrong: {
    color: colors.text,
    fontWeight: '700',
  },
  progressTrack: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 18,
  },
  progressStep: {
    flex: 1,
    height: 6,
    borderRadius: 999,
  },
  progressStepActive: {
    backgroundColor: colors.success,
  },
  progressStepIdle: {
    backgroundColor: '#DFD4CB',
  },
  statusCard: {
    marginTop: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    flexDirection: 'row',
    gap: 14,
  },
  statusIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusCopy: {
    flex: 1,
  },
  statusTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  statusMessage: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
  courierCard: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#D7C2B2',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  courierCopy: {
    flex: 1,
    marginLeft: 14,
  },
  courierName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  courierRole: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
  },
  phoneButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
