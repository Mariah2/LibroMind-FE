import LibraryModel from "../libraries/library.model";

export default interface UserModel {
    addressId: number | null;
    libraryId: number | null;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    phone: string;
    library: LibraryModel;
}