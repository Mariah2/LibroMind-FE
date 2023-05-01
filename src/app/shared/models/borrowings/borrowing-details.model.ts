import BookCardModel from "../books/book-card.model";
import UserBasicInfoModel from "../users/user-basic-info.model";

export default interface BorrowingDetailsModel{
    id: number;
    userId: number;
    bookLibraryId: number;
    borrowingDate: Date;
    returnDate: Date;
    hasReturnedBook: boolean | null;
    wasExtensionRequested: boolean;
    book: BookCardModel;
    user: UserBasicInfoModel;
}