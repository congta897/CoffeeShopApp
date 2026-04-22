import { Feather, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProductImage } from '../constants/assets';
import { colors, shadow } from '../constants/theme';
import appData from '../data/data.json';

function SummaryRow({ label, value, muted = false, strikethrough = false }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, muted && styles.summaryLabelMuted]}>{label}</Text>
      <Text style={[styles.summaryValue, strikethrough && styles.strikethrough]}>{value}</Text>
    </View>
  );
}

export default function OrderScreen({ navigation, route }) {
  const [deliveryType, setDeliveryType] = useState('deliver');
  const [quantity, setQuantity] = useState(1);
  const parentNavigation = navigation.getParent();

  const selectedProduct =
    appData.products.find(
      (item) => item.id === (route.params?.productId ?? appData.order.defaultItemId)
    ) ?? appData.products[0];

  useEffect(() => {
    setQuantity(1);
  }, [selectedProduct.id]);

  const subtotal = selectedProduct.price * quantity;
  const deliveryFee = deliveryType === 'deliver' ? appData.order.deliveryFee : 0;
  const total = subtotal + deliveryFee;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Pressable style={styles.circleButton} onPress={() => navigation.navigate('HomeTab')}>
            <Ionicons name="arrow-back" size={20} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Order</Text>
          <View style={styles.circleButtonPlaceholder} />
        </View>

        <View style={styles.segment}>
          <Pressable
            style={[styles.segmentButton, deliveryType === 'deliver' && styles.segmentButtonActive]}
            onPress={() => setDeliveryType('deliver')}
          >
            <Text
              style={[
                styles.segmentButtonText,
                deliveryType === 'deliver' && styles.segmentButtonTextActive,
              ]}
            >
              Deliver
            </Text>
          </Pressable>
          <Pressable
            style={[styles.segmentButton, deliveryType === 'pickup' && styles.segmentButtonActive]}
            onPress={() => setDeliveryType('pickup')}
          >
            <Text
              style={[
                styles.segmentButtonText,
                deliveryType === 'pickup' && styles.segmentButtonTextActive,
              ]}
            >
              Pick Up
            </Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{appData.order.addressTitle}</Text>
          <Text style={styles.addressTitle}>{appData.order.addressLine1}</Text>
          <Text style={styles.addressText}>{appData.order.addressLine2}</Text>

          <View style={styles.addressActions}>
            <Pressable style={styles.outlineChip}>
              <Feather name="edit-2" size={14} color={colors.text} />
              <Text style={styles.outlineChipText}>Edit Address</Text>
            </Pressable>

            <Pressable style={styles.outlineChip}>
              <Feather name="file-text" size={14} color={colors.text} />
              <Text style={styles.outlineChipText}>Add Note</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={[styles.cartCard, shadow]}>
          <View style={styles.cartArtBox}>
            <Image source={getProductImage(selectedProduct.imageKey)} style={styles.cartImage} />
          </View>

          <View style={styles.cartInfo}>
            <Text style={styles.cartTitle}>{selectedProduct.name}</Text>
            <Text style={styles.cartSubtitle}>{selectedProduct.subtitle}</Text>
          </View>

          <View style={styles.quantityControl}>
            <Pressable
              style={styles.qtyButton}
              onPress={() => setQuantity((current) => Math.max(1, current - 1))}
            >
              <Feather name="minus" size={16} color={colors.text} />
            </Pressable>
            <Text style={styles.quantityText}>{quantity}</Text>
            <Pressable
              style={styles.qtyButton}
              onPress={() => setQuantity((current) => current + 1)}
            >
              <Feather name="plus" size={16} color={colors.text} />
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.discountCard}>
          <View style={styles.discountLeft}>
            <View style={styles.discountIcon}>
              <Ionicons name="pricetag-outline" size={16} color={colors.primary} />
            </View>
            <Text style={styles.discountText}>{appData.order.discountTitle}</Text>
          </View>
          <Feather name="chevron-right" size={18} color={colors.textMuted} />
        </Pressable>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <SummaryRow label="Price" value={`$${subtotal.toFixed(2)}`} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <View style={styles.deliveryFeeRow}>
              {deliveryType === 'deliver' ? (
                <>
                  <Text style={[styles.summaryValue, styles.strikethrough]}>
                    ${appData.order.deliveryFeeOriginal.toFixed(2)}
                  </Text>
                  <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
                </>
              ) : (
                <Text style={styles.summaryValue}>$0.00</Text>
              )}
            </View>
          </View>
        </View>

        <Pressable style={styles.paymentCard}>
          <View style={styles.paymentLeft}>
            <View style={styles.walletBadge}>
              <Ionicons name="wallet-outline" size={18} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.paymentMethod}>{appData.order.paymentMethod}</Text>
              <Text style={styles.paymentBalance}>${appData.order.walletBalance.toFixed(2)}</Text>
            </View>
          </View>
          <Feather name="chevron-down" size={18} color={colors.textMuted} />
        </Pressable>

        <Pressable
          style={styles.orderButton}
          onPress={() =>
            (parentNavigation ?? navigation).navigate('Delivery', {
              productId: selectedProduct.id,
              quantity,
              total: total.toFixed(2),
            })
          }
        >
          <Text style={styles.orderButtonText}>Order</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 6,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  circleButtonPlaceholder: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  segment: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 18,
    backgroundColor: '#EDE3DA',
    gap: 6,
  },
  segmentButton: {
    flex: 1,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentButtonActive: {
    backgroundColor: colors.primary,
  },
  segmentButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  segmentButtonTextActive: {
    color: '#FFFFFF',
  },
  section: {
    marginTop: 22,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },
  addressTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  addressText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
  addressActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  outlineChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
  },
  outlineChipText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: 22,
  },
  cartCard: {
    marginTop: 18,
    padding: 14,
    borderRadius: 20,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartArtBox: {
    width: 70,
    height: 70,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#E8DED4',
  },
  cartImage: {
    width: '100%',
    height: '100%',
  },
  cartInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cartTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  cartSubtitle: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    minWidth: 10,
    textAlign: 'center',
  },
  discountCard: {
    marginTop: 18,
    borderRadius: 18,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  discountLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  discountIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  summaryLabel: {
    color: colors.textMuted,
    fontSize: 14,
  },
  summaryLabelMuted: {
    opacity: 0.8,
  },
  summaryValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  deliveryFeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  strikethrough: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  paymentCard: {
    marginTop: 24,
    borderRadius: 20,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  walletBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentMethod: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  paymentBalance: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  orderButton: {
    marginTop: 'auto',
    height: 58,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
