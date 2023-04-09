import CategoryModel from "../categories/category.model";

export default interface BookCategoryModel {
    id: number;
    category: CategoryModel;
}