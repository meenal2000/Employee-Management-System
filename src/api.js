import axios from 'axios';

const API_BASE_URL = 'https://free-ap-south-1.cosmocloud.io/development/api'; 

export const getEmployees = () => axios.get(`${API_BASE_URL}/employee?limit=10&offset=0`);
export const getEmployee = (id) => axios.get(`${API_BASE_URL}/employee/${id}`);
export const createEmployee = (employee) => axios.post(`${API_BASE_URL}/employee`, employee);
export const deleteEmployee = (id) => axios.delete(`${API_BASE_URL}/employee/${id}`);
