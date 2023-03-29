import AddressModel from "../address/address.model";

export default interface LibraryModel {
    id: number;
    addressId: number;
    name: string;
    address: AddressModel;
}