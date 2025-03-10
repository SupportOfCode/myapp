import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
export const getTodo = async (setProduct: any) => {
    try {
      const res = await axios.get(
        apiUrl + "todos" 
      );
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
};
  
export const addTodo = async ({title, status }: any) => {
  try {
    await axios.post(apiUrl + "todos", {
      title,
      status
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async ({ id , title, status}: any) => {
  try {
    await axios.put(apiUrl + "todos/" + id, {
      title,
      status
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async ( id : string) => {
  try {
    await axios.delete(apiUrl + "todos/" + id);
  } catch (error) {
    console.log(error);
  }
};