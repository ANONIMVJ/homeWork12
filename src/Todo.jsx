import React, { useState } from "react";

function Todo() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [alertModal, setAlertModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(null);
    const [editModal, setEditModal] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [reversed, setReversed] = useState(false);

    const handleAdd = () => {
        if (!title) {
            setAlertModal(true);
            return;
        }
        setTasks([...tasks, { id: Date.now(), title, completed: false }]);
        setTitle("");
    };

    const handleDelete = () => {
        setTasks(tasks.filter(task => task.id !== deleteModal));
        setDeleteModal(null);
    };

    const handleEditSave = () => {
        setTasks(tasks.map(task => 
            task.id === editModal ? { ...task, title: editTitle } : task
        ));
        setEditModal(null);
        setEditTitle("");
    };

    const handleComplete = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <div className="max-w-[640px] mx-auto p-5 bg-gray-100 rounded-lg shadow-lg border border-gray-300">
            <h1 className="text-4xl mb-5 text-center font-bold text-blue-600">Tasks</h1>
            <div className="flex justify-center gap-3 mb-4">
                <input
                    className="p-2 border rounded shadow w-full"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title..."
                />
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded shadow"
                    onClick={handleAdd}
                >Add</button>
            </div>

            <button className="bg-purple-500 text-white px-5 py-2 rounded shadow mb-4" onClick={() => setReversed(!reversed)}>
                {reversed ? "Reversed" : "Reverse"}
            </button>

            <div className="space-y-3">
                {tasks.length === 0 && <p className="text-center text-gray-500">No tasks</p>}
                {(reversed ? [...tasks].reverse() : tasks).map(task => (
                    <div className={`border rounded shadow p-3 flex justify-between items-center bg-white ${task.completed ? 'bg-green-200' : ''}`} key={task.id}>
                        <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {reversed ? task.title.split('').reverse().join('') : task.title}
                        </span>
                        <div className="flex gap-2">
                            <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => handleComplete(task.id)}>
                                {task.completed ? "Undo" : "Complete"}
                            </button>
                            <button className="bg-yellow-400 text-white px-3 py-1 rounded" onClick={() => { setEditModal(task.id); setEditTitle(task.title); }}>Edit</button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => setDeleteModal(task.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Alert Modal */}
            {alertModal && (
                <div className="absolute z-10 p-5 rounded-lg shadow-lg border border-gray-300 bg-white" style={{ top: '20%', left: '50%', transform: 'translate(-50%, -20%)' }}>
                    <p className="mb-4">Task title cannot be empty!</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setAlertModal(false)}>OK</button>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal !== null && (
                <div className="absolute z-10 p-5 rounded-lg shadow-lg border border-gray-300 bg-white" style={{ top: '20%', left: '50%', transform: 'translate(-50%, -20%)' }}>
                    <p className="mb-4">Are you sure you want to delete this task?</p>
                    <div className="flex gap-3">
                        <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setDeleteModal(null)}>Cancel</button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editModal !== null && (
                <div className="absolute z-10 p-5 rounded-lg shadow-lg border border-gray-300 bg-white" style={{ top: '20%', left: '50%', transform: 'translate(-50%, -20%)' }}>
                    <p className="mb-2">Edit Task</p>
                    <input
                        className="border p-2 w-full mb-3"
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <div className="flex gap-3">
                        <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setEditModal(null)}>Cancel</button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleEditSave}>Save</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Todo;