import BookModel from "../books/book.model";
import UserModel from "../users/user.model";

export default interface UserBookModel {
    id: number;
    book: BookModel;
    user: UserModel;
}