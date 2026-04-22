import { Feather, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProductImage, imageAssets } from '../constants/assets';
import { colors, shadow } from '../constants/theme';
import appData from '../data/data.json';

const HORIZONTAL_PADDING = 24;
const CARD_GAP = 14;
const CARD_WIDTH = (Dimensions.get('window').width - HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;

function ProductCard({ item, navigation }) {
  return (
    <Pressable
      style={styles.productCard}
      onPress={() => navigation.navigate('Detail', { productId: item.id })}
    >
      <View style={styles.productArtBox}>
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color={colors.warning} />
          <Text style={styles.ratingBadgeText}>{item.rating}</Text>
        </View>
        <Image source={getProductImage(item.imageKey)} style={styles.productImage} />
      </View>

      <Text style={styles.productName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.productSubtitle}>{item.subtitle}</Text>

      <View style={styles.productFooter}>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate('Detail', { productId: item.id })}
        >
          <Feather name="plus" size={16} color="#FFFFFF" />
        </Pressable>
      </View>
    </Pressable>
  );
}

export default function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(appData.categories[0]);

  const filteredProducts =
    selectedCategory === 'All Coffee'
      ? appData.products
      : appData.products.filter((product) => product.category === selectedCategory);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar style="dark" />
      <FlatList
        data={filteredProducts}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={
          <View style={styles.listHeaderWrap}>
            <View style={styles.darkHeader}>
              <Text style={styles.locationLabel}>{appData.user.locationLabel}</Text>
              <View style={styles.locationRow}>
                <Text style={styles.locationValue}>{appData.user.locationValue}</Text>
                <Ionicons name="chevron-down" size={16} color="#D5CBC3" />
              </View>

              <View style={styles.searchRow}>
                <View style={styles.searchBox}>
                  <Ionicons name="search-outline" size={18} color="#BFB3AA" />
                  <TextInput
                    placeholder="Search Coffee"
                    placeholderTextColor="#BFB3AA"
                    style={styles.searchInput}
                  />
                </View>

                <Pressable style={styles.filterButton}>
                  <Feather name="sliders" size={18} color="#FFFFFF" />
                </Pressable>
              </View>

              <ImageBackground
                source={imageAssets.homePromoBackground}
                imageStyle={styles.promoBackgroundImage}
                style={styles.promoCard}
              >
                <View style={styles.promoOverlay} />
                <View style={styles.promoCopy}>
                  <Text style={styles.promoTag}>{appData.promo.tag}</Text>
                  <Text style={styles.promoTitle}>{appData.promo.headline}</Text>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.categoriesSection}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.chipsRow}>
                  {appData.categories.map((category) => {
                    const isActive = category === selectedCategory;

                    return (
                      <Pressable
                        key={category}
                        style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                        onPress={() => setSelectedCategory(category)}
                      >
                        <Text
                          style={[
                            styles.categoryChipText,
                            isActive && styles.categoryChipTextActive,
                          ]}
                        >
                          {category}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        }
        renderItem={({ item }) => <ProductCard item={item} navigation={navigation} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: 120,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  listHeaderWrap: {
    marginHorizontal: -HORIZONTAL_PADDING,
    marginBottom: 24,
  },
  darkHeader: {
    backgroundColor: colors.dark,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 8,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  locationLabel: {
    color: '#A3968C',
    fontSize: 12,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationValue: {
    color: '#F7F2ED',
    fontSize: 16,
    fontWeight: '600',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
  },
  searchBox: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  filterButton: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoCard: {
    marginTop: 22,
    borderRadius: 24,
    minHeight: 146,
    padding: 18,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  promoBackgroundImage: {
    borderRadius: 24,
  },
  promoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17,12,8,0.18)',
  },
  promoCopy: {
    flex: 1,
    justifyContent: 'flex-start',
    zIndex: 2,
  },
  promoTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#F94343',
    color: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    fontSize: 11,
    fontWeight: '700',
  },
  promoTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '800',
    marginTop: 12,
    maxWidth: 168,
  },
  categoriesSection: {
    paddingLeft: HORIZONTAL_PADDING,
    marginTop: 18,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingRight: HORIZONTAL_PADDING,
  },
  categoryChip: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryChipText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 12,
    ...shadow,
  },
  productArtBox: {
    height: 132,
    borderRadius: 18,
    marginBottom: 14,
    overflow: 'hidden',
    backgroundColor: '#E8DED4',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: 'rgba(17,17,17,0.46)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  productName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  productSubtitle: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  productFooter: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productPrice: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
