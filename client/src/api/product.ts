import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
export const getProduct = async (setProduct: any) => {
    try {
      const res = await axios.get(
        apiUrl + "products" 
      );
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
};
  
export const addProduct = async ({title, img }: any) => {
  try {
    await axios.post(apiUrl + "products", {
      title,
      img
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async ({ id , title, img}: any) => {
  try {
    await axios.put(apiUrl + "products/" + id, {
      title,
      img
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async ( id : string) => {
  try {
    await axios.delete(apiUrl + "products/" + id);
  } catch (error) {
    console.log(error);
  }
};