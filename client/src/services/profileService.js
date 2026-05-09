import api from "./api";

const profileService = {
    getProfile: async () => {
        const response = await api.get('/api/profile');
        return response.data;
    }
};

export default profileService;