import BookModel from "../books/book.model";
import UserModel from "../users/user.model";

export default interface ReviewModel {
    id: number;
    rating: number;
    bookId: number;
    userId: number;
    text: string;
    addedDate: Date;
    user: UserModel;
    book: BookModel;
}