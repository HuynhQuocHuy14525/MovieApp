import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import MovieCard, { Movie } from '../components/MovieCard';

// Dữ liệu giả
const mockMovie: Movie = {
  id: '1',
  title: 'Inception',
  genre: 'Sci-Fi',
  year: 2010,
  rating: 8,
  poster: 'https://picsum.photos/200/300',
  isShowing: true,
};

describe('MovieCard', () => {
  // a. Test render
  it('hiển thị đúng tên phim và điểm đánh giá đúng định dạng', async () => {
    await render(<MovieCard movie={mockMovie} onSelect={jest.fn()} />);
    expect(screen.getByText('Inception')).toBeTruthy();
    expect(screen.getByText('⭐ 8.0')).toBeTruthy(); // rating 8 → "⭐ 8.0"
  });

  // b. Test layout
  it('layout="row" có hiển thị thể loại', async () => {
    await render(<MovieCard movie={mockMovie} layout="row" onSelect={jest.fn()} />);
    expect(screen.queryByText(/Sci-Fi/)).not.toBeNull();
  });

  it('layout="tile" không hiển thị thể loại', async () => {
    await render(<MovieCard movie={mockMovie} layout="tile" onSelect={jest.fn()} />);
    expect(screen.queryByText(/Sci-Fi/)).toBeNull();
  });

  // c. Test trạng thái
  it('isShowing: true hiển thị ✅', async () => {
    await render(
      <MovieCard movie={{ ...mockMovie, isShowing: true }} onSelect={jest.fn()} />
    );
    expect(screen.queryByText(/✅/)).not.toBeNull();
    expect(screen.queryByText(/❌/)).toBeNull();
  });

  it('isShowing: false hiển thị ❌', async () => {
    await render(
      <MovieCard movie={{ ...mockMovie, isShowing: false }} onSelect={jest.fn()} />
    );
    expect(screen.queryByText(/❌/)).not.toBeNull();
    expect(screen.queryByText(/✅/)).toBeNull();
  });

  // d. Test sự kiện
  it('nhấn thẻ gọi onSelect đúng 1 lần với movie.id', async () => {
    const onSelect = jest.fn();
    await render(<MovieCard movie={mockMovie} onSelect={onSelect} />);
    await fireEvent.press(screen.getByText('Inception'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});
