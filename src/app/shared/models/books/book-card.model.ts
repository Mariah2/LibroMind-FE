import AuthorModel from "../authors/author.model";

export default interface BookCardModel {
  id: number;
  title: string;
  coverUrl: string | undefined;
  rating: number;
  isMarkedToRead: boolean | undefined;
  author: AuthorModel;
}
