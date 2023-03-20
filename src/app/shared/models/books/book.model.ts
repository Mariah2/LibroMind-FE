export default interface BookModel {
    id: number;
    authorId: number;
    publisherId: number;
    title: string;
    publishingDate: Date;
    description: string;
    pagesNumber: number;
    coverUrl : string | undefined;
}