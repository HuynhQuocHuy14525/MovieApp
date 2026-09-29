import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Platform, RefreshControl, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MovieCard, { Movie } from './components/MovieCard';

const API_URL = 'https://6abb5808b2118ed7abb84917.mockapi.io/movies';

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isTile, setIsTile] = useState(false);

  const getMovies = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setMovies(data);
  };

  useEffect(() => {
    getMovies().finally(() => setLoading(false));
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getMovies();
    setRefreshing(false);
  };

  const onSelect = useCallback((id: string) => {
    const movie = movies.find((m) => m.id === id);
    if (!movie) return;
    if (Platform.OS === 'web') window.alert(movie.title);
    else Alert.alert(movie.title);
  }, [movies]);

  const numColumns = isTile ? 2 : 1;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Movie App</Text>
        <View style={styles.row}>
          <Text>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={setIsTile} />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          key={String(numColumns)}
          data={movies}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          columnWrapperStyle={isTile ? styles.column : undefined}
          renderItem={({ item }) => (
            <MovieCard movie={item} layout={isTile ? 'tile' : 'row'} onSelect={onSelect} />
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Home />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold' },
  row: { flexDirection: 'row', alignItems: 'center' },
  column: { justifyContent: 'space-between' },
});
