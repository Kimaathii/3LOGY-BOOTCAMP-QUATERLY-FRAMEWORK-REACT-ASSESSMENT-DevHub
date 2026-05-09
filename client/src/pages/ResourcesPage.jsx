import { useState, useEffect } from "react";
import resourceService from "../services/resourceService";
import { Trash2, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

function ResourcesPage() {
    const [resources, setResources] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [resourceFormData, setResourceFormData] = useState({
        title: "",
        url: "",
        description: "",
        type: "article",
        tags: ""
    });

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const data = await resourceService.getAll();
                setResources(data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };
        fetchResources();
    }, []);

    const handleChange = (name, value) => {
        setResourceFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await resourceService.create(resourceFormData);
            toast.success("Resource saved successfully!");
            setResourceFormData({ title: "", url: "", description: "", type: "article", tags: "" });
            const data = await resourceService.getAll();
            setResources(data);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await resourceService.delete(id);
            toast.success("Resource deleted!");
            const data = await resourceService.getAll();
            setResources(data);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const getTypeColor = (type) => {
        const colors = {
            article: "bg-blue-900 text-blue-100",
            video: "bg-red-900 text-red-100",
            documentation: "bg-purple-900 text-purple-100",
            tutorial: "bg-green-900 text-green-100",
            library: "bg-indigo-900 text-indigo-100",
            tool: "bg-orange-900 text-orange-100",
            blog: "bg-pink-900 text-pink-100",
            other: "bg-slate-700 text-slate-100"
        };
        return colors[type] || colors.other;
    };

    if (isLoading && resources.length === 0) {
        return <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-white">Loading resources...</div>;
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-900 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-2">Resources</h1>
                <p className="text-slate-400 mb-8">Curate and organize learning resources</p>

                {/* Add Resource Form */}
                <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-8 mb-8 border border-slate-700">
                    <h2 className="text-2xl font-bold text-white mb-8">Add New Resource</h2>

                    {/* Row 1: Title and URL */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Title *</label>
                            <input
                                type="text"
                                placeholder="e.g., React Documentation"
                                name="title"
                                value={resourceFormData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                className="w-full bg-slate-700 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">URL *</label>
                            <input
                                type="text"
                                placeholder="https://example.com/resource"
                                name="url"
                                value={resourceFormData.url}
                                onChange={(e) => handleChange('url', e.target.value)}
                                className="w-full bg-slate-700 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Row 2: Description */}
                    <div className="mb-6">
                        <label className="block text-slate-300 text-sm font-medium mb-2">Description</label>
                        <textarea
                            placeholder="What is this resource about?"
                            name="description"
                            value={resourceFormData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            className="w-full bg-slate-700 text-white rounded px-4 py-3 mb-0 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    {/* Row 3: Type and Tags */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Resource Type *</label>
                            <select
                                name="type"
                                value={resourceFormData.type}
                                onChange={(e) => handleChange('type', e.target.value)}
                                className="w-full bg-slate-700 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="article">Article</option>
                                <option value="video">Video</option>
                                <option value="documentation">Documentation</option>
                                <option value="tutorial">Tutorial</option>
                                <option value="library">Library</option>
                                <option value="tool">Tool</option>
                                <option value="blog">Blog</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Tags</label>
                            <input
                                type="text"
                                placeholder="react,javascript,web (comma-separated)"
                                name="tags"
                                value={resourceFormData.tags}
                                onChange={(e) => handleChange('tags', e.target.value)}
                                className="w-full bg-slate-700 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded transition-colors"
                    >
                        {isLoading ? "Saving..." : "Save Resource"}
                    </button>
                </form>

                {/* Resources List */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Your Resources ({resources.length})</h2>
                    {resources.length === 0 ? (
                        <p className="text-slate-400">No resources yet. Add one above!</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {resources.map((resource) => (
                                <div key={resource.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-colors">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-white">{resource.title}</h3>
                                            </div>
                                            {resource.description && (
                                                <p className="text-slate-400 text-sm mb-3">{resource.description}</p>
                                            )}
                                            <a
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 mb-3 transition-colors"
                                            >
                                                <ExternalLink size={16} />
                                                {resource.url}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 flex-wrap mb-4">
                                        <span className={`px-3 py-1 rounded text-xs font-semibold ${getTypeColor(resource.type)}`}>
                                            {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                                        </span>
                                        {resource.tags && resource.tags.split(",").map((tag, idx) => (
                                            <span key={idx} className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-xs">
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-2 justify-end">
                                        <button
                                            onClick={() => handleDelete(resource.id)}
                                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                                        >
                                            <Trash2 size={18} /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ResourcesPage;
