import { Feather, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProductImage } from '../constants/assets';
import { colors } from '../constants/theme';
import appData from '../data/data.json';

function IconBadge({ iconPack = 'Feather', iconName }) {
  if (iconPack === 'Ionicons') {
    return (
      <View style={styles.iconBadge}>
        <Ionicons name={iconName} size={18} color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.iconBadge}>
      <Feather name={iconName} size={18} color={colors.primary} />
    </View>
  );
}

export default function DetailScreen({ navigation, route }) {
  const product =
    appData.products.find((item) => item.id === route.params?.productId) ?? appData.products[0];

  const [selectedSize, setSelectedSize] = useState(product.sizes[1] ?? product.sizes[0]);

  useEffect(() => {
    setSelectedSize(product.sizes[1] ?? product.sizes[0]);
  }, [product.id, product.sizes]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Pressable style={styles.circleButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color={colors.text} />
          </Pressable>

          <Text style={styles.headerTitle}>Detail</Text>

          <Pressable style={styles.circleButton}>
            <Ionicons name="heart-outline" size={20} color={colors.text} />
          </Pressable>
        </View>

        <View style={styles.heroCard}>
          <Image source={getProductImage(product.imageKey)} style={styles.heroImage} />
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productSubtitle}>{product.subtitle}</Text>

          <View style={styles.metaRow}>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={18} color={colors.warning} />
              <Text style={styles.ratingValue}>{product.rating}</Text>
              <Text style={styles.ratingCount}>({product.reviews})</Text>
            </View>

            <View style={styles.featureRow}>
              <IconBadge iconName="truck" />
              <IconBadge iconPack="Ionicons" iconName="cafe-outline" />
              <IconBadge iconName="package" />
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            {product.description}
            <Text style={styles.readMoreText}> Read More</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeRow}>
            {product.sizes.map((size) => {
              const isSelected = size === selectedSize;

              return (
                <Pressable
                  key={size}
                  style={[styles.sizeChip, isSelected && styles.sizeChipActive]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[styles.sizeText, isSelected && styles.sizeTextActive]}>{size}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.purchaseRow}>
          <View>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.priceValue}>${product.price.toFixed(2)}</Text>
          </View>

          <Pressable
            style={styles.buyButton}
            onPress={() =>
              navigation.navigate('MainTabs', {
                screen: 'OrderTab',
                params: { productId: product.id, size: selectedSize },
              })
            }
          >
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 18,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  heroCard: {
    height: 228,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#E8DED4',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  infoBlock: {
    paddingTop: 22,
  },
  productName: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  productSubtitle: {
    color: colors.textMuted,
    fontSize: 15,
    marginTop: 6,
  },
  metaRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  ratingCount: {
    color: colors.textMuted,
    fontSize: 13,
  },
  featureRow: {
    flexDirection: 'row',
    gap: 10,
  },
  iconBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  descriptionText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  readMoreText: {
    color: colors.primary,
    fontWeight: '700',
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeChip: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeChipActive: {
    borderColor: colors.primary,
    backgroundColor: '#FFF5EE',
  },
  sizeText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  sizeTextActive: {
    color: colors.primary,
  },
  purchaseRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 18,
  },
  priceLabel: {
    color: colors.textMuted,
    fontSize: 14,
    marginBottom: 4,
  },
  priceValue: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '800',
  },
  buyButton: {
    flex: 1,
    height: 58,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
