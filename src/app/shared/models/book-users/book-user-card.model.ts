import BookCardModel from "../books/book-card.model";

export default interface BookUserCardModel {
  id: number;
  bookId: number;
  userId: number;
  book: BookCardModel;
}
