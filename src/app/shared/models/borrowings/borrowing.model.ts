export default interface BorrowingModel{
    id: number;
    userId: number;
    bookLibraryId: number;
    borrowingDate: Date;
    returnDate: Date;
    hasReturnedBook: boolean | null;
    wasExtensionRequested: boolean;
}