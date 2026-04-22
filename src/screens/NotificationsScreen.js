import { Feather, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/theme';

const notifications = [
  {
    id: 'order-ready',
    icon: 'bag-handle-outline',
    title: 'Your order is being prepared',
    message: 'Caffe Mocha is now in the queue for brewing.',
    time: '2 min ago',
  },
  {
    id: 'promo',
    icon: 'pricetag-outline',
    title: 'Promo available today',
    message: 'Buy one get one free is active for selected drinks.',
    time: '1 hr ago',
  },
  {
    id: 'delivery',
    icon: 'bicycle-outline',
    title: 'Courier is on the way',
    message: 'Track delivery progress from the order screen.',
    time: '3 hr ago',
  },
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Notification</Text>
        <Text style={styles.subtitle}>Latest order and promo updates appear here.</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {notifications.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardIcon}>
              <Ionicons name={item.icon} size={20} color={colors.primary} />
            </View>

            <View style={styles.cardCopy}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardMessage}>{item.message}</Text>
            </View>

            <View style={styles.cardMeta}>
              <Text style={styles.cardTime}>{item.time}</Text>
              <Feather name="chevron-right" size={18} color={colors.textMuted} />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
  content: {
    padding: 24,
    gap: 14,
    paddingBottom: 120,
  },
  card: {
    borderRadius: 22,
    backgroundColor: colors.surface,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCopy: {
    flex: 1,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  cardMessage: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
  cardMeta: {
    alignItems: 'flex-end',
    gap: 10,
  },
  cardTime: {
    color: colors.textMuted,
    fontSize: 12,
  },
});
