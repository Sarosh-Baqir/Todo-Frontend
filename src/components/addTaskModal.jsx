import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { AddTaskValidation } from "../validation/addTaskValidationSchema";
import axiosInstance from "../lib/apiClient";
import { ADD_TASK_ROUTE } from "../utils/constants";
import { toast } from "react-toastify";

const AddTaskModal = ({ isOpen, onClose, updateTasks }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "pending",
  });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setTask({
      ...task,
      priority: checked ? id : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = AddTaskValidation(task);
    if (validationErrors.hasErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axiosInstance.post(ADD_TASK_ROUTE, task);
      toast.success(response?.data?.message || "Task added successfully");
      updateTasks(response?.data?.data);
      setTask({
        title: "",
        description: "",
        dueDate: "",
        priority: "",
        status: "pending",
      });
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Failed to add a task");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 sm:p-12 rounded-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/2 xl:w-2/4 max-w-lg border-2 border-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title and Go Back Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold border-b-2 border-blue-500 pb-1">
            Add New Task
          </h2>
          <button className="text-blue-500 flex items-center" onClick={onClose}>
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>

        <form className="border-2 border-gray-300 p-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={task.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Task Title"
            />
            {errors.title && (
              <div className="text-red-500 text-xs">{errors.title}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            {errors.dueDate && (
              <div className="text-red-500 text-xs">{errors.dueDate}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm">Priority</label>
            <div className="flex flex-wrap justify-start space-x-4 sm:space-x-8">
              <div className="flex items-center mb-2 sm:mb-0">
                <input
                  type="checkbox"
                  id="extreme"
                  name="priority"
                  checked={task.priority === "extreme"}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="extreme" className="text-red-500">
                  Extreme
                </label>
              </div>
              <div className="flex items-center mb-2 sm:mb-0">
                <input
                  type="checkbox"
                  id="moderate"
                  name="priority"
                  checked={task.priority === "moderate"}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="moderate" className="text-blue-500">
                  Moderate
                </label>
              </div>
              <div className="flex items-center mb-2 sm:mb-0">
                <input
                  type="checkbox"
                  id="low"
                  name="priority"
                  checked={task.priority === "low"}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="low" className="text-green-500">
                  Low
                </label>
              </div>
            </div>
            {errors.priority && (
              <div className="text-red-500 text-xs">{errors.priority}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm">
              Task Description
            </label>
            <textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Start writing here...."
            ></textarea>
            {errors.description && (
              <div className="text-red-500 text-xs">{errors.description}</div>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Done
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
