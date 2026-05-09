import { useState, useEffect } from "react";
import taskService from "../services/taskService";
import { Trash2, CheckCircle2, Circle } from "lucide-react";
import toast from "react-hot-toast";

function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [taskFormData, setTaskFormData] = useState({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        dueDate: ""
    });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await taskService.getAll();
                setTasks(data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const handleChange = (name, value) => {
        setTaskFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await taskService.create(taskFormData);
            toast.success("Task created successfully!");
            setTaskFormData({ title: "", description: "", status: "todo", priority: "medium", dueDate: "" });
            const data = await taskService.getAll();
            setTasks(data);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await taskService.update(id, { status: newStatus });
            toast.success("Task status updated!");
            const data = await taskService.getAll();
            setTasks(data);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await taskService.delete(id);
            toast.success("Task deleted!");
            const data = await taskService.getAll();
            setTasks(data);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "done":
                return "bg-green-900 text-green-100";
            case "inProgress":
                return "bg-yellow-900 text-yellow-100";
            case "todo":
                return "bg-slate-700 text-slate-100";
            default:
                return "bg-slate-700 text-slate-100";
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
                return "bg-red-900 text-red-100";
            case "medium":
                return "bg-orange-900 text-orange-100";
            case "low":
                return "bg-blue-900 text-blue-100";
            default:
                return "bg-slate-700 text-slate-100";
        }
    };

    if (isLoading && tasks.length === 0) {
        return <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-white">Loading tasks...</div>;
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-900 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-2">Tasks</h1>
                <p className="text-slate-400 mb-8">Create and manage your development tasks</p>

                {/* Add Task Form */}
                <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-8 mb-8 border border-slate-700">
                    <h2 className="text-2xl font-bold text-white mb-8">Add New Task</h2>

                    {/* Row 1: Title and Due Date */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Title *</label>
                            <input
                                type="text"
                                placeholder="e.g., Build authentication system"
                                name="title"
                                value={taskFormData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                className="w-full bg-slate-700 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Due Date</label>
                            <input
                                type="date"
                                name="dueDate"
                                value={taskFormData.dueDate}
                                onChange={(e) => handleChange('dueDate', e.target.value)}
                                className="w-full bg-slate-700 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Row 2: Description */}
                    <div className="mb-6">
                        <label className="block text-slate-300 text-sm font-medium mb-2">Description</label>
                        <textarea
                            placeholder="What needs to be done?"
                            name="description"
                            value={taskFormData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            className="w-full bg-slate-700 text-white rounded px-4 py-3 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    {/* Row 3: Status and Priority */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Status *</label>
                            <select
                                name="status"
                                value={taskFormData.status}
                                onChange={(e) => handleChange('status', e.target.value)}
                                className="w-full bg-slate-700 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="todo">To Do</option>
                                <option value="inProgress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Priority *</label>
                            <select
                                name="priority"
                                value={taskFormData.priority}
                                onChange={(e) => handleChange('priority', e.target.value)}
                                className="w-full bg-slate-700 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="low">Low Priority</option>
                                <option value="medium">Medium Priority</option>
                                <option value="high">High Priority</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded transition-colors"
                    >
                        {isLoading ? "Creating..." : "Create Task"}
                    </button>
                </form>

                {/* Tasks List */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Your Tasks ({tasks.length})</h2>
                    {tasks.length === 0 ? (
                        <p className="text-slate-400">No tasks yet. Create one above!</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {tasks.map((task) => (
                                <div key={task.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-colors">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <button
                                                    onClick={() => handleStatusChange(task.id, task.status === 'done' ? 'todo' : 'done')}
                                                    className="text-blue-400 hover:text-blue-300 transition-colors"
                                                >
                                                    {task.status === 'done' ? (
                                                        <CheckCircle2 size={24} />
                                                    ) : (
                                                        <Circle size={24} />
                                                    )}
                                                </button>
                                                <h3 className={`text-xl font-bold ${task.status === 'done' ? 'text-slate-400 line-through' : 'text-white'}`}>
                                                    {task.title}
                                                </h3>
                                            </div>
                                            {task.description && (
                                                <p className="text-slate-400 text-sm ml-9">{task.description}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-2 flex-wrap mb-4 ml-9">
                                        <span className={`px-3 py-1 rounded text-xs font-semibold ${getStatusColor(task.status)}`}>
                                            {task.status === 'inProgress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                        </span>
                                        <span className={`px-3 py-1 rounded text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                        </span>
                                        {task.dueDate && (
                                            <span className="bg-slate-700 text-slate-200 px-3 py-1 rounded text-xs">
                                                Due: {new Date(task.dueDate).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-2 justify-end ml-9">
                                        <button
                                            onClick={() => handleDelete(task.id)}
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

export default TasksPage;
