import AuthorModel from "../authors/author.model";
import LibraryBookModel from "../library-books/library-book.model";
import PublisherModel from "../publishers/publisher.model";

export default interface BookModel {
    id: number;
    authorId: number;
    publisherId: number;
    title: string;
    publishingDate: Date;
    description: string;
    pagesNumber: number;
    coverUrl : string | undefined;
    rating: number;
    author: AuthorModel;
    publisher: PublisherModel;
    libraryBooks: LibraryBookModel[];
}