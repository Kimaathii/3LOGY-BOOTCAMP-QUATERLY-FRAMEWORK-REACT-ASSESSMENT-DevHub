import api from "./api";

const resourceService = {
    getById: async (id) => {
        const response = await api.get(`/api/resources/${id}`);
        return response.data;
    },
    create: async (resourceData) => {
        const response = await api.post('/api/resources', resourceData);
        return response.data;
    },
    update: async (id, resourceData) => {
        const response = await api.put(`/api/resources/${id}`, resourceData);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/api/resources/${id}`);
        return response.data;
    },
    getAll: async () => {
        const response = await api.get('/api/resources');
        return response.data;
    }
};

export default resourceService;