import { StyleSheet, View } from 'react-native';

export default function CoffeeArt({
  size = 110,
  accent = '#2A1C18',
  foam = '#E8C68B',
  style,
}) {
  const saucerSize = size * 0.9;
  const cupSize = size * 0.68;
  const foamSize = cupSize * 0.76;
  const handleSize = cupSize * 0.26;

  return (
    <View style={[styles.wrapper, { width: size, height: size }, style]}>
      <View
        style={[
          styles.glow,
          {
            width: size * 0.96,
            height: size * 0.96,
            borderRadius: size / 2,
            backgroundColor: accent,
          },
        ]}
      />
      <View
        style={[
          styles.saucer,
          {
            width: saucerSize,
            height: saucerSize,
            borderRadius: saucerSize / 2,
          },
        ]}
      />
      <View
        style={[
          styles.cupShadow,
          {
            width: cupSize,
            height: cupSize,
            borderRadius: cupSize / 2,
          },
        ]}
      />
      <View
        style={[
          styles.handle,
          {
            width: handleSize,
            height: handleSize,
            borderRadius: handleSize / 2,
            right: size * 0.12,
            top: size * 0.4,
          },
        ]}
      />
      <View
        style={[
          styles.cup,
          {
            width: cupSize,
            height: cupSize,
            borderRadius: cupSize / 2,
          },
        ]}
      >
        <View
          style={[
            styles.foam,
            {
              width: foamSize,
              height: foamSize,
              borderRadius: foamSize / 2,
              backgroundColor: foam,
            },
          ]}
        />
        <View style={[styles.swirl, styles.swirlLarge]} />
        <View style={[styles.swirl, styles.swirlSmall]} />
        <View style={[styles.swirl, styles.swirlCenter]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    opacity: 0.18,
  },
  saucer: {
    position: 'absolute',
    backgroundColor: '#EDE6E0',
    borderWidth: 4,
    borderColor: '#F8F4F1',
  },
  cupShadow: {
    position: 'absolute',
    backgroundColor: 'rgba(25, 15, 10, 0.08)',
    transform: [{ translateY: 4 }],
  },
  handle: {
    position: 'absolute',
    borderWidth: 4,
    borderColor: '#D8CFC8',
    backgroundColor: 'transparent',
  },
  cup: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBF7F3',
    borderWidth: 3,
    borderColor: '#E2D7CF',
  },
  foam: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  swirl: {
    position: 'absolute',
    borderColor: '#FBF7F3',
    borderRadius: 999,
  },
  swirlLarge: {
    width: '72%',
    height: '46%',
    borderWidth: 4,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '28deg' }],
  },
  swirlSmall: {
    width: '46%',
    height: '28%',
    borderWidth: 3,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    transform: [{ rotate: '-18deg' }, { translateY: 6 }],
  },
  swirlCenter: {
    width: '24%',
    height: '14%',
    borderWidth: 2,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    transform: [{ rotate: '16deg' }, { translateY: 1 }],
  },
});
