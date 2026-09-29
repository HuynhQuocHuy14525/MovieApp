import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 3a
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
  const ratingText = `⭐ ${Number(movie.rating).toFixed(1)}`; // Câu 3b
  const statusText = movie.isShowing ? '✅ Đang chiếu' : '❌ Ngừng chiếu';

  return (
    // 3c
    <TouchableOpacity
      testID="movie-card"
      activeOpacity={0.7}
      onPress={() => onSelect(movie.id)}
      // 4c
      style={[styles.card, isTile && styles.cardTile]}
    >
      <View style={isTile && styles.posterWrapTile}>
        <Image
          source={{ uri: movie.poster }}
          style={[styles.poster, isTile && styles.posterTile]}
        />
        {/*4b */}
        {isTile && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingBadgeText}>{ratingText}</Text>
          </View>
        )}
      </View>

      <View style={[styles.info, isTile && styles.infoTile]}>
        <Text style={styles.title} numberOfLines={isTile ? 1 : 2}>
          {movie.title}
        </Text>

        {/* Câu 4a*/}
        {!isTile && (
          <>
            <Text style={styles.meta}>{`Thể loại: ${movie.genre}`}</Text>
            <Text style={styles.meta}>{`Năm: ${movie.year}`}</Text>
            <Text style={styles.rating}>{ratingText}</Text>
          </>
        )}

        <Text style={styles.status}>{statusText}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // layout="row": bố cục ngang
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  // layout="tile": bố cục dọc, rộng 48% để 2 cột đều nhau, item lẻ không bị giãn
  cardTile: {
    flexDirection: 'column',
    width: '48%',
    padding: 0,
    overflow: 'hidden',
  },
  poster: {
    width: 70,
    height: 100,
    borderRadius: 6,
    backgroundColor: '#ddd',
  },
  posterWrapTile: {
    width: '100%',
  },
  posterTile: {
    width: '100%',
    height: undefined,
    aspectRatio: 2 / 3,
    borderRadius: 0,
  },
  ratingBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  infoTile: {
    flex: 0,
    marginLeft: 0,
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
    color: '#666',
  },
  rating: {
    fontSize: 14,
    marginTop: 4,
  },
  status: {
    fontSize: 13,
    marginTop: 4,
  },
});

// Câu 3d
export default React.memo(MovieCard);
