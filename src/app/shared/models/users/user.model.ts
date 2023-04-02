import LibraryModel from "../libraries/library.model";

export default interface UserModel {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    phone: string;
    library: LibraryModel;
}