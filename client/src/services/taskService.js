import api from "./api";

const taskService = {
    getById: async (id) => {
        const response = await api.get(`/api/tasks/${id}`);
        return response.data;
    },
    create: async (taskData) => {
        const response = await api.post('/api/tasks', taskData);
        return response.data;
    },
    update: async (id, taskData) => {
        const response = await api.put(`/api/tasks/${id}`, taskData);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/api/tasks/${id}`);
        return response.data;
    },
    getAll: async () => {
        const response = await api.get('/api/tasks');
        return response.data;
    }
};

export default taskService;