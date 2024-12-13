import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import axiosInstance from "../lib/apiClient";
import { GET_TASKS_ROUTE, DELETE_TASK_ROUTE } from "../utils/constants";
import { toast } from "react-toastify";
import AddTaskModal from "./addTaskModal";
import EditTaskModal from "./editTaskModal";

const Tasks = ({ searchQuery }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(GET_TASKS_ROUTE)
      .then((response) => {
        setTasks(response.data.data);
        setFilteredTasks(response.data.data);
        toast.success(response?.data?.message || "Tasks fetched successfully");
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Error fetching tasks";
        toast.error(errorMessage);
      });
  }, []);

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchQuery, tasks]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => setIsEditModalOpen(false);

  const updateTasks = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTaskList = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  const deleteTask = (taskId) => {
    axiosInstance
      .delete(`${DELETE_TASK_ROUTE}/${taskId}`)
      .then((response) => {
        toast.success(response?.data?.message || "Task deleted successfully");

        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        toast.error(error?.message || "Failed to delete task");
      });
  };

  return (
    <div>
      {/* Add Task Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition"
        >
          <FaPlus className="text-xl" />
        </button>
      </div>

      {/* Dynamically Rendered Tasks */}
      {filteredTasks.map((task) => (
        <div
          key={task._id}
          className="mb-6 p-6 sm:p-8 border-2 border-gray-400 bg-[#f8f8f8] shadow-md rounded-lg"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold">{task.title}</h2>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button
                onClick={() => openEditModal(task)}
                className="flex items-center justify-center p-2.5 bg-green-500 rounded-lg hover:bg-green-600 transition duration-200"
              >
                <FaEdit className="text-white text-lg" />
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                className="flex items-center justify-center p-2.5 bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
              >
                <FaTrashAlt className="text-white text-lg" />
              </button>
            </div>
          </div>

          <div className="mb-2 space-y-2">
            <p className="font-semibold">
              Priority: <span className="text-red-500">{task.priority}</span>
            </p>
            <p className="font-semibold">
              Status: <span className="text-red-500">{task.status}</span>
            </p>
          </div>

          <div className="mb-4">
            <p>{new Date(task.createdAt).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="font-semibold">Description:</p>
            <p>{task.description}</p>
          </div>
        </div>
      ))}

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        updateTasks={updateTasks}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        taskToEdit={taskToEdit}
        updateTaskList={updateTaskList}
      />
    </div>
  );
};

export default Tasks;
