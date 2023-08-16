import { useMutation } from '@apollo/client';
import { ADD_PRODUCT,UPDATE_PRODUCT,DELETE_PRODUCT } from './Mutations';

interface Product {
  name: string;
  price: number;
  quantity: number;
  id: string; 
}

export function useAddProduct() {
  const [addProduct] = useMutation(ADD_PRODUCT);

  const handleAddProduct = async (productData: Product) => {
    try {
      const { data } = await addProduct({
        variables: {
          name: productData.name,
          price: productData.price,
          quantity: productData.quantity,
          id: productData.id, 
        },
      });
      return data.insert_products_one;
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return { handleAddProduct };
}


export function useUpdateProduct() {
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const handleUpdateProduct = async (productData: Product) => {
    try {
      const { data } = await updateProduct({
        variables: {
          name: productData.name,
          price: productData.price,
          quantity: productData.quantity,
          id: productData.id, 
        },
      });
      return data.update_products_by_pk;
    } catch (error) {
      console.error('Error updated product:', error);
    }
  };

  return { handleUpdateProduct };
}


export function useDeleteProduct() {
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const handleDeleteProduct = async (id: string) => {
    try {
      const { data } = await deleteProduct({
        variables: {
          id: id, 
        },
      });
      return id;
    } catch (error) {
      console.error('Error delited product:', error);
    }
  };

  return { handleDeleteProduct };
}