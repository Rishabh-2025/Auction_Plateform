import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    contacts: [],
    contact: null,
  },
  reducers: {
    createContactRequest(state) {
      state.loading = true;
    },
    createContactSuccess(state, action) {
      state.loading = false;
      state.contacts.push(action.payload);
      toast.success("Message sent successfully");
    },
    createContactFailed(state) {
      state.loading = false;
    },
    fetchContactsRequest(state) {
      state.loading = true;
    },
    fetchContactsSuccess(state, action) {
      state.loading = false;
      state.contacts = action.payload;
    },
    fetchContactsFailed(state) {
      state.loading = false;
    },
    fetchContactRequest(state) {
      state.loading = true;
    },
    fetchContactSuccess(state, action) {
      state.loading = false;
      state.contact = action.payload;
    },
    fetchContactFailed(state) {
      state.loading = false;
    },
    deleteContactRequest(state) {
      state.loading = true;
    },
    deleteContactSuccess(state, action) {
      state.loading = false;
      state.contacts = state.contacts.filter(
        (contact) => contact._id !== action.payload
      );
      toast.success("Message deleted successfully");
    },
    deleteContactFailed(state) {
      state.loading = false;
    },
  },
});

// Async actions

export const createContact = (data) => async (dispatch) => {
  dispatch(contactSlice.actions.createContactRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/contact-us/create-message",
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(contactSlice.actions.createContactSuccess(response.data.contact));
  } catch (error) {
    dispatch(contactSlice.actions.createContactFailed());
    toast.error(error.response?.data?.message || "Failed to send message.");
  }
};

export const fetchContacts = () => async (dispatch) => {
  dispatch(contactSlice.actions.fetchContactsRequest());
  try {
    const response = await axios.get("http://localhost:5000/api/v1/contact-us", {
      withCredentials: true,
    });
    dispatch(contactSlice.actions.fetchContactsSuccess(response.data.messages));

  } catch (error) {
    dispatch(contactSlice.actions.fetchContactsFailed());
    toast.error("Failed to fetch messages.");
  }
};

export const fetchContact = (id) => async (dispatch) => {
  dispatch(contactSlice.actions.fetchContactRequest());
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/contact-us/${id}`,
      { withCredentials: true }
    );
    dispatch(contactSlice.actions.fetchContactsSuccess(response.data.messages));

  } catch (error) {
    dispatch(contactSlice.actions.fetchContactFailed());
    toast.error("Failed to fetch message.");
  }
};

export const replyToContact = (id, replyContent) => async (dispatch) => {
  dispatch(contactSlice.actions.fetchContactRequest());
  try {
    await axios.put(
      `http://localhost:5000/api/v1/contact-us/reply/${id}`,
      { reply: replyContent },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(fetchContacts()); // refresh list
    toast.success("Reply sent successfully.");
  } catch (error) {
    dispatch(contactSlice.actions.fetchContactFailed());
    toast.error("Failed to send reply.");
  }
};

export const deleteContact = (id) => async (dispatch) => {
  dispatch(contactSlice.actions.deleteContactRequest());
  try {
    await axios.delete(`http://localhost:5000/api/v1/contact-us/${id}`, {
      withCredentials: true,
    });
    dispatch(contactSlice.actions.deleteContactSuccess(id));
  } catch (error) {
    dispatch(contactSlice.actions.deleteContactFailed());
    toast.error("Failed to delete message.");
  }
};

export default contactSlice.reducer;
