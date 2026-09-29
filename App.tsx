import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MovieCard, { Movie } from './components/MovieCard';

const API_URL = 'https://6abb5808b2118ed7abb84917.mockapi.io/movies';

function HomeScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isTile, setIsTile] = useState(false); // Câu 5a

  // c2
  const fetchMovies = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setMovies(data.map((m: any) => ({ ...m, id: String(m.id) })));
    } catch (e) {
      Alert.alert('Lỗi', 'Không tải được danh sách phim');
    }
  };

  useEffect(() => {
    fetchMovies().finally(() => setLoading(false));
  }, []);

  // 6
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMovies();
    setRefreshing(false);
  };

  // Câu 3c
  const handleSelect = useCallback(
    (id: string) => {
      const movie = movies.find((m) => m.id === id);
      if (movie) Alert.alert('Phim đã chọn', movie.title);
    },
    [movies]
  );

  const numColumns = isTile ? 2 : 1;

  return (
    // 1b
    <SafeAreaView style={styles.container}>
      {/*1c*/}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Movie App</Text>

        {/*5a*/}
        <View style={styles.switchRow}>
          <Text>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={setIsTile} />
        </View>
      </View>

      {loading ? (
        // Câu 2c
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#e50914" />
          <Text>Đang tải...</Text>
        </View>
      ) : (
        <FlatList
          key={String(numColumns)} // Câu 5c
          data={movies}
          keyExtractor={(item) => item.id}
          numColumns={numColumns} // Câu 5b
          columnWrapperStyle={isTile ? styles.columnWrapper : undefined} // Câu 5d
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              layout={isTile ? 'tile' : 'row'}
              onSelect={handleSelect}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
}

// 1a
export default function App() {
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#e50914' },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 12 },
  columnWrapper: { justifyContent: 'space-between' },
});
