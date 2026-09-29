import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
};

export type MovieCardProps = {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
};

function MovieCard({ movie, layout = 'row', onSelect }: MovieCardProps) {
  const isTile = layout === 'tile';
  const rating = `⭐ ${movie.rating.toFixed(1)}`;

  return (
    <TouchableOpacity style={[styles.card, isTile && styles.cardTile]} onPress={() => onSelect(movie.id)}>
      <View>
        <Image source={{ uri: movie.poster }} style={[styles.poster, isTile && styles.posterTile]} />
        {isTile && <Text style={styles.badge}>{rating}</Text>}
      </View>
      <View style={styles.info}>
        <Text numberOfLines={isTile ? 1 : undefined}>{movie.title}</Text>
        {!isTile && <Text>{movie.genre}</Text>}
        {!isTile && <Text>{movie.year}</Text>}
        {!isTile && <Text>{rating}</Text>}
        <Text>{movie.isShowing ? '✅' : '❌'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', marginBottom: 10, backgroundColor: '#fff' },
  cardTile: { flexDirection: 'column', width: '48%' },
  poster: { width: 70, height: 100 },
  posterTile: { width: '100%', height: 'auto', aspectRatio: 2 / 3 },
  badge: { position: 'absolute', top: 5, left: 5, backgroundColor: '#fff' },
  info: { flexShrink: 1, padding: 8 },
});

export default React.memo(MovieCard);
