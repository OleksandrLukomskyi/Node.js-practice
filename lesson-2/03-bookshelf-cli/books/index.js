import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const filePath = path.resolve("books", "books.json");

async function readBooks() {
  const data = await fs.readFile(filePath, { encoding: "utf-8" });

  return JSON.parse(data);
}

function writeBooks(books) {
  return fs.writeFile(filePath, JSON.stringify(books, undefined, 2));
}
// writeBooks([
//   {
//     "id": "u9kgwNWGi3uUUwh0b8V49",
//     "title": "Eloquent JavaScript, Third Edition",
//     "author": "Marijn Haverbeke"
//   },
//   {
//     "id": "YxhM4QDxPeA3SmPHcEZPJ",
//     "title": "Practical Modern JavaScript",
//     "author": "Nicolas Bevacqua"
//   },
//   {
//     "id": "ck89qe3HriUDHe09TBoJ8",
//     "title": "Speaking JavaScript",
//     "author": "Axel Rauschmayer"
//   },
//   {
//     "id": "e1Tpn_I3wBkLREY6wG0lb",
//     "title": "Learning JavaScript Design Patterns",
//     "author": "Addy Osmani"
//   },
//   {
//     "id": "Op8ApLTY0-Vn2cR0vDIwG",
//     "title": "You Don't Know JS Yet",
//     "author": "Kyle Simpson"
//   },
//   {
//     "title": "Title",
//     "author": "Author",
//     "id": "57a51d49-fa36-4c55-87f0-973388fa731b"
//   },
//   {
//     "title": "Title",
//     "author": "Author",
//     "id": "3de04cc9-18db-433c-a260-b4b13639da51"
//   },
//   {
//     "title": "Title",
//     "author": "Author",
//     "id": "ab1494e7-993b-45d3-b30a-0a56d7aff4b9"
//   }
// ])

async function getBooks() {
  const books = await readBooks();
  return books;
}

async function getOneBook(id) {
  const books = await readBooks();
  const book = books.find((book) => book.id === id);
  if (typeof book === "undefined") {
    return null;
  }
  return book;
}
async function createBook(book) {
  const books = await readBooks();
  const newBook = { ...book, id: crypto.randomUUID() };
  books.push(newBook);
  await writeBooks(books);
  return newBook;
}
async function updateBook(id, book) {
  const books = await readBooks();
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    return null;
  }
  const updatedBook = { ...book, id };
  const newBooks = [
    ...books.slice(0, index),
    updatedBook,
    ...books.slice(index + 1),
  ];

  // books[index]=updatedBook;
  // await writeBooks(books)
  await writeBooks(newBooks);

  return updatedBook;
}

async function removeBook(id) {
  const books = await readBooks();
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    return null;
  }
  const removedBook = books[index];
  const newBooks = [...books.slice(0, index), ...books.slice(index + 1)];
  await writeBooks(newBooks);
  
  // books.splice(index, 1);
  // await writeBooks(books)

  return removedBook;
}
export  {getBooks, getOneBook, createBook, updateBook, removeBook};
