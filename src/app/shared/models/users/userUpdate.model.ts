import LibraryModel from "../libraries/library.model";

export default interface UserUpdateModel {
    firstName: string;
    lastName: string;
    birthDate: Date;
    phone: string;
    library: LibraryModel;
}