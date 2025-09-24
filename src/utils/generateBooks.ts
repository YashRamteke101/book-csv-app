import { faker } from '@faker-js/faker';
import type { Book } from '../types';


export function generateFakeBooks(count = 10000): Book[] {
  const out: Book[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      Title: faker.book.title(),
      Author: faker.book.author(),
      Genre: faker.book.genre(),
      PublishedYear: String(faker.number.int({ min: 1900, max: 2025 })),
      ISBN: faker.commerce.isbn({ variant: 13, separator: '-' }),
    });
  }
  return out;
}