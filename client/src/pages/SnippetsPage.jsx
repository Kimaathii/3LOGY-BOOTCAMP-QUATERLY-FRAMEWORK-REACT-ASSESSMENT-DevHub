import { useState, useEffect } from "react";
import snippetService from "../services/snippetService";
import { Trash2, Edit2 } from "lucide-react";
import toast from "react-hot-toast";

function SnippetsPage() {
    const [snippets, setSnippets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snippetFormData, setSnippetFormData] = useState({
        title: "",
        description: "",
        code: "",
        language: "javascript",
        tags: ""
    });

    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const data = await snippetService.getAll();
                setSnippets(data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };
        fetchSnippets();
    }, []);

    const handleChange = (name, value) => {
        setSnippetFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await snippetService.create(snippetFormData);
            toast.success("Snippet created successfully!");
            setSnippetFormData({ title: "", description: "", code: "", language: "javascript", tags: "" });
            const data = await snippetService.getAll();
            setSnippets(data);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await snippetService.delete(id);
            toast.success("Snippet deleted!");
            const data = await snippetService.getAll();
            setSnippets(data);
        } catch (err) {
            toast.error(err.message);
        }
    };

    if (isLoading && snippets.length === 0) {
        return <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-white">Loading snippets...</div>;
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-900 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-2">Snippets</h1>
                <p className="text-slate-400 mb-8">Create and manage your code snippets</p>

                {/* Add Snippet Form */}
                <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-8 mb-8 border border-slate-700">
                    <h2 className="text-2xl font-bold text-white mb-8">Add New Snippet</h2>

                    {/* Row 1: Title and Language */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Title *</label>
                            <input
                                type="text"
                                placeholder="e.g., Array Destructuring"
                                name="title"
                                value={snippetFormData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                className="w-full bg-slate-700 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Language *</label>
                            <select
                                name="language"
                                value={snippetFormData.language}
                                onChange={(e) => handleChange('language', e.target.value)}
                                className="w-full bg-slate-700 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="csharp">C#</option>
                                <option value="css">CSS</option>
                                <option value="html">HTML</option>
                                <option value="sql">SQL</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 2: Description */}
                    <div className="mb-6">
                        <label className="block text-slate-300 text-sm font-medium mb-2">Description</label>
                        <input
                            type="text"
                            placeholder="What does this snippet do?"
                            name="description"
                            value={snippetFormData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            className="w-full bg-slate-700 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Row 3: Code */}
                    <div className="mb-6">
                        <label className="block text-slate-300 text-sm font-medium mb-2">Code *</label>
                        <textarea
                            placeholder="Paste your code here..."
                            name="code"
                            value={snippetFormData.code}
                            onChange={(e) => handleChange('code', e.target.value)}
                            className="w-full bg-slate-700 text-white rounded px-4 py-3 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
                            required
                        />
                    </div>

                    {/* Row 4: Tags */}
                    <div className="mb-6">
                        <label className="block text-slate-300 text-sm font-medium mb-2">Tags</label>
                        <input
                            type="text"
                            placeholder="es6,destructuring,javascript (comma-separated)"
                            name="tags"
                            value={snippetFormData.tags}
                            onChange={(e) => handleChange('tags', e.target.value)}
                            className="w-full bg-slate-700 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded transition-colors"
                    >
                        {isLoading ? "Saving..." : "Save Snippet"}
                    </button>
                </form>

                {/* Snippets List */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Your Snippets ({snippets.length})</h2>
                    {snippets.length === 0 ? (
                        <p className="text-slate-400">No snippets yet. Create one above!</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {snippets.map((snippet) => (
                                <div key={snippet.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-colors">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{snippet.title}</h3>
                                            <p className="text-slate-400 text-sm">{snippet.description}</p>
                                        </div>
                                        <span className="bg-blue-900 text-blue-100 px-3 py-1 rounded text-xs font-semibold">
                                            {snippet.language}
                                        </span>
                                    </div>

                                    <pre className="bg-slate-900 rounded p-4 mb-4 overflow-x-auto border border-slate-600">
                                        <code className="text-slate-300 text-sm font-mono">{snippet.code}</code>
                                    </pre>

                                    {snippet.tags && (
                                        <div className="flex gap-2 mb-4 flex-wrap">
                                            {snippet.tags.split(",").map((tag, idx) => (
                                                <span key={idx} className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-xs">
                                                    {tag.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex gap-2 justify-end">
                                        <button
                                            onClick={() => handleDelete(snippet.id)}
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

export default SnippetsPage;