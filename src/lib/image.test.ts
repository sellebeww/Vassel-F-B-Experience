import {describe, expect, it} from 'vitest';
import {withImageWidth} from './image';

describe('withImageWidth', () => {
  const base = 'https://images.unsplash.com/photo-1?auto=format&fit=crop&w=1200&q=80';

  it('rewrites the width of an Unsplash URL and keeps other parameters', () => {
    expect(withImageWidth(base, 640)).toBe(
      'https://images.unsplash.com/photo-1?auto=format&fit=crop&w=640&q=80',
    );
  });

  it('does not touch a width that merely ends in the same digits elsewhere', () => {
    expect(withImageWidth('https://images.unsplash.com/photo-1?w=1200&h=1200', 300)).toBe(
      'https://images.unsplash.com/photo-1?w=300&h=1200',
    );
  });

  it('leaves non-Unsplash URLs and URLs without a width unchanged', () => {
    expect(withImageWidth('https://example.com/a.jpg?w=1200', 300)).toBe(
      'https://example.com/a.jpg?w=1200',
    );
    expect(withImageWidth('https://images.unsplash.com/photo-1?q=80', 300)).toBe(
      'https://images.unsplash.com/photo-1?q=80',
    );
  });
});
