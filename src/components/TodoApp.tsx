import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "../supabase-client";

// Edit Form Component
const EditForm = ({
  todo,
  onSave,
  onCancel,
}: {
  todo: Todo;
  onSave: (title: string, description: string) => void;
  onCancel: () => void;
}) => {
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Edit title..."
      />
      <textarea
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        placeholder="Edit description..."
        rows={2}
      />
      <div className="flex space-x-2">
        <motion.button
          onClick={() => onSave(editTitle, editDescription)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save ✅
        </motion.button>
        <motion.button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cancel ❌
        </motion.button>
      </div>
    </div>
  );
};

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getTodos = async () => {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) {
      console.error(error);
    } else {
      setTodos(data);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async () => {
    if (title.trim()) {
      setLoading(true);
      const { data, error } = await supabase
        .from("tasks")
        .insert({
          title: title.trim(),
          description: description.trim(),
          completed: false,
        })
        .select()
        .single();

      if (error) {
        console.error("Error adding todo:", error);
      } else {
        setTodos([data, ...todos]);
        setTitle("");
        setDescription("");
      }
      setLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Error deleting todo:", error);
    } else {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const toggleComplete = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const { error } = await supabase
      .from("tasks")
      .update({ completed: !todo.completed })
      .eq("id", id);

    if (error) {
      console.error("Error updating todo:", error);
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
  };

  const saveEdit = async (newTitle: string, newDescription: string) => {
    if (newTitle.trim() && editingId) {
      const { error } = await supabase
        .from("tasks")
        .update({
          title: newTitle.trim(),
          description: newDescription.trim(),
        })
        .eq("id", editingId);

      if (error) {
        console.error("Error updating todo:", error);
      } else {
        setTodos(
          todos.map((todo) =>
            todo.id === editingId
              ? {
                  ...todo,
                  title: newTitle.trim(),
                  description: newDescription.trim(),
                }
              : todo
          )
        );
        setEditingId(null);
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-gray-800 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Todo App 📝
        </motion.h1>

        {/* Add Todo Form */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter todo title..."
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Enter description (optional)..."
                rows={3}
              />
            </div>
            <motion.button
              onClick={addTodo}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Adding..." : "Add Todo ➕"}
            </motion.button>
          </div>
        </motion.div>

        {/* Todo List */}
        <div className="space-y-4">
          <AnimatePresence>
            {todos.map((todo, index) => (
              <motion.div
                key={todo.id}
                className={`bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-l-4 ${
                  todo.completed
                    ? "border-green-500 opacity-75"
                    : "border-blue-500"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                {editingId === todo.id ? (
                  // Edit Mode
                  <EditForm
                    todo={todo}
                    onSave={saveEdit}
                    onCancel={cancelEdit}
                  />
                ) : (
                  // View Mode
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <motion.button
                          onClick={() => toggleComplete(todo.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            todo.completed
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-gray-300 hover:border-green-500"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {todo.completed && "✓"}
                        </motion.button>
                        <h3
                          className={`text-lg font-semibold ${
                            todo.completed
                              ? "line-through text-gray-500"
                              : "text-gray-800"
                          }`}
                        >
                          {todo.title}
                        </h3>
                      </div>
                      {todo.description && (
                        <p
                          className={`text-gray-600 ml-9 ${
                            todo.completed ? "line-through" : ""
                          }`}
                        >
                          {todo.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 ml-9 mt-2">
                        Created:{" "}
                        {new Date(todo.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <motion.button
                        onClick={() => startEdit(todo)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Edit ✏️
                      </motion.button>
                      <motion.button
                        onClick={() => deleteTodo(todo.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Delete 🗑️
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {todos.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="text-6xl mb-4">📝</div>
            <p className="text-xl text-gray-600">
              No todos yet. Add your first todo above!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
