import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    categories: [],
    category: null,
  },
  reducers: {
    createCategoryRequest(state) {
      state.loading = true;
    },
    createCategorySuccess(state, action) {
      state.loading = false;
      state.categories.push(action.payload);
      toast.success("Category created successfully");
    },
    createCategoryFailed(state) {
      state.loading = false;
    },
    fetchCategoriesRequest(state) {
      state.loading = true;
    },
    fetchCategoriesSuccess(state, action) {
      state.loading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailed(state) {
      state.loading = false;
    },
    fetchCategoryRequest(state) {
      state.loading = true;
    },
    fetchCategorySuccess(state, action) {
      state.loading = false;
      state.category = action.payload;
    },
    fetchCategoryFailed(state) {
      state.loading = false;
    },
    deleteCategoryRequest(state) {
      state.loading = true;
    },
    deleteCategorySuccess(state, action) {
      state.loading = false;
      state.categories = state.categories.filter(
        (cat) => cat._id !== action.payload
      );
      toast.success("Category deleted successfully");
    },
    deleteCategoryFailed(state) {
      state.loading = false;
    },
    updateCategoryRequest(state) {
      state.loading = true;
    },
    updateCategorySuccess(state, action) {
      state.loading = false;
      state.categories = state.categories.map((cat) =>
        cat._id === action.payload._id ? action.payload : cat
      );
      toast.success("Category updated successfully");
    },
    updateCategoryFailed(state) {
      state.loading = false;
    },
  },
});

// Async actions
export const createCategory = (data) => async (dispatch) => {

  dispatch(categorySlice.actions.createCategoryRequest());
  try {
   const response = await axios.post(
      "https://auction-plateform-ubyc.onrender.com/api/v1/category/create-category",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    dispatch(categorySlice.actions.createCategorySuccess(response.data));
  } catch (error) {
    dispatch(categorySlice.actions.createCategoryFailed());
    toast.error(error.response?.data?.message || "Category creation failed.");
  }
};

export const fetchCategories = () => async (dispatch) => {
  dispatch(categorySlice.actions.fetchCategoriesRequest());
  try {
    const response = await axios.get("https://auction-plateform-ubyc.onrender.com/api/v1/category");

    dispatch(categorySlice.actions.fetchCategoriesSuccess(response.data.categories));
  } catch (error) {
    dispatch(categorySlice.actions.fetchCategoriesFailed());
    toast.error("Failed to fetch categories.");
  }
};

export const fetchCategory = (id) => async (dispatch) => {
  dispatch(categorySlice.actions.fetchCategoryRequest());
  try {
    const response = await axios.get(`https://auction-plateform-ubyc.onrender.com/api/v1/category/${id}`);
    dispatch(categorySlice.actions.fetchCategorySuccess(response.data));
  } catch (error) {
    dispatch(categorySlice.actions.fetchCategoryFailed());
    toast.error("Failed to fetch category.");
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  dispatch(categorySlice.actions.deleteCategoryRequest());
  try {
    await axios.delete(`https://auction-plateform-ubyc.onrender.com/api/v1/category/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch(categorySlice.actions.deleteCategorySuccess(id));
  } catch (error) {
    dispatch(categorySlice.actions.deleteCategoryFailed());
    toast.error("Failed to delete category.");
  }
};

export const updateCategory = (id, data) => async (dispatch) => {
  dispatch(categorySlice.actions.updateCategoryRequest());
  try {
    const response = await axios.put(`https://auction-plateform-ubyc.onrender.com/api/v1/category/${id}`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(categorySlice.actions.updateCategorySuccess(response.data));
  } catch (error) {
    dispatch(categorySlice.actions.updateCategoryFailed());
    toast.error("Failed to update category.");
  }
};

export default categorySlice.reducer;
