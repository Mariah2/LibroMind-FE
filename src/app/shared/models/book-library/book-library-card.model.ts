import BookCardModel from "../books/book-card.model";

export default interface BookLibraryCardModel {
  id: number;
  bookId: number;
  libraryId: number;
  quantity: number;
  book: BookCardModel;
}
