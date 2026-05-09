import api from "./api";


const snippetService = {
    getById: async (id) => {
        const response = await api.get(`/api/snippets/${id}`);
        return response.data;
    },
    create: async (snippetData) => {
        const response = await api.post('/api/snippets', snippetData);
        return response.data;
    },
    update: async (id, snippetData) => {
        const response = await api.put(`/api/snippets/${id}`, snippetData);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/api/snippets/${id}`);
        return response.data;
    },
    getAll: async () => {
        const response = await api.get('/api/snippets');
        return response.data;
    }

}


export default snippetService;