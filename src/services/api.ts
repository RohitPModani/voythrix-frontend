import axios from "axios";
import { TripAnswers } from "../types/index";
import { VacationAnswers } from "../types/index";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getQuestions = async () => {
  try {
    const response = await api.get("/questions");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const generateItinerary = async (answers: TripAnswers) => {
  try {
    const response = await api.post("/generate-itinerary", answers);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVacationQuestions = async () => {
  try {
    const response = await api.get("/vacation-questions");
    return response.data;
  } catch (error) {
    throw error;
  }
};  

export const generateVacation = async (answers: VacationAnswers) => {
  try {
    const response = await api.post("/generate-vacation", answers);
    return response.data;
  } catch (error) {
    throw error;
  }
};