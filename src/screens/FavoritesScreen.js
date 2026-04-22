import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProductImage } from '../constants/assets';
import { colors, shadow } from '../constants/theme';
import appData from '../data/data.json';

export default function FavoritesScreen({ navigation }) {
  const favoriteProducts = appData.products.slice(0, 2);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Favourite</Text>
        <Text style={styles.subtitle}>Your saved coffee picks for the next order.</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {favoriteProducts.map((item) => (
          <Pressable
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate('Detail', { productId: item.id })}
          >
            <Image source={getProductImage(item.imageKey)} style={styles.cardImage} />
            <View style={styles.cardCopy}>
              <View style={styles.badge}>
                <Ionicons name="heart" size={14} color="#FFFFFF" />
              </View>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              <Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
            </View>
          </Pressable>
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
    gap: 16,
    paddingBottom: 120,
  },
  card: {
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    ...shadow,
  },
  cardImage: {
    width: '100%',
    height: 188,
  },
  cardCopy: {
    padding: 18,
  },
  badge: {
    position: 'absolute',
    top: -20,
    right: 18,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  cardSubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 6,
  },
  cardPrice: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 14,
  },
});
