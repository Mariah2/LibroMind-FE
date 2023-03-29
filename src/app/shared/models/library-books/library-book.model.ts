import LibraryModel from "../libraries/library.model";
import BookModel from "../books/book.model";

export default interface LibraryBookModel {
    id: number;
    libraryId: number;
    idBook: number;
    quantity: number;
    book: BookModel;
    library: LibraryModel;
}