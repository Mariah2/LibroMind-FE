export default interface AddReviewModel {
    id: number;
    bookId: number;
    userId: number;
    rating: number;
    text: string;
    addedDate: Date;
}