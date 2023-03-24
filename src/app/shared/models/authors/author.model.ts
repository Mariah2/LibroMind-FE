import BookModel from "../books/book.model";

export default interface AuthorModel {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    nationality: string;
    books: BookModel[];
}