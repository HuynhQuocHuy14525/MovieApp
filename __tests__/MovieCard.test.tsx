import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import MovieCard from '../components/MovieCard';

const movie = {
  id: '1',
  title: 'Inception',
  genre: 'Sci-Fi',
  year: 2010,
  rating: 8,
  poster: 'https://picsum.photos/200/300',
  isShowing: true,
};

test('render ten phim va rating', async () => {
  await render(<MovieCard movie={movie} onSelect={jest.fn()} />);
  expect(screen.getByText('Inception')).toBeTruthy();
  expect(screen.getByText('⭐ 8.0')).toBeTruthy();
});

test('layout row co the loai, tile khong co', async () => {
  await render(<MovieCard movie={movie} layout="row" onSelect={jest.fn()} />);
  expect(screen.queryByText('Sci-Fi')).not.toBeNull();

  await render(<MovieCard movie={movie} layout="tile" onSelect={jest.fn()} />);
  expect(screen.queryByText('Sci-Fi')).toBeNull();
});

test('trang thai dang chieu / ngung chieu', async () => {
  await render(<MovieCard movie={movie} onSelect={jest.fn()} />);
  expect(screen.getByText('✅')).toBeTruthy();

  await render(<MovieCard movie={{ ...movie, isShowing: false }} onSelect={jest.fn()} />);
  expect(screen.getByText('❌')).toBeTruthy();
});

test('nhan vao goi onSelect', async () => {
  const onSelect = jest.fn();
  await render(<MovieCard movie={movie} onSelect={onSelect} />);
  await fireEvent.press(screen.getByText('Inception'));
  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(onSelect).toHaveBeenCalledWith('1');
});
