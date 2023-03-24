import BookModel from "../books/book.model";

export default interface PublisherModel {
    id: number;
    name: string;
    books: BookModel[];
}