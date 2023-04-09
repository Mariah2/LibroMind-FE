import AuthorModel from "../authors/author.model";
import BookCategoryModel from "../book-categories/book-category.model";
import LibraryBookModel from "../library-books/library-book.model";
import PublisherModel from "../publishers/publisher.model";
import ReviewModel from "../reviews/review.model";

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
    reviews: ReviewModel[];
    bookLibraries: LibraryBookModel[];
    bookCategories: BookCategoryModel[];
    isMarkedToRead: boolean | undefined;
}