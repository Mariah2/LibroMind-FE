import BookModel from "../books/book.model";
import LibraryModel from "../libraries/library.model";

export default interface BorrowBookModel{
    userId: number
    book: BookModel,
    library: LibraryModel,
}