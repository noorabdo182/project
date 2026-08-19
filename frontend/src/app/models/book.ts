export interface Book {
  _id?: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  quantity: number;
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}