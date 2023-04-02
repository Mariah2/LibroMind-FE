import AddressModel from "../addresses/address.model";

export default interface LibraryModel {
    id: number;
    addressId: number;
    name: string;
    address: AddressModel;
}