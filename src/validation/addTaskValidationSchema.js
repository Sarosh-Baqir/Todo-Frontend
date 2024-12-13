export const AddTaskValidation = (task) => {
  let errors = {};

  // Title validation
  if (!task.title) {
    errors.title = "Title is required";
    errors.hasErrors = true;
  }

  // Description validation (optional, no validation required)
  if (task.description && task.description.trim().length === 0) {
    errors.description = "Description cannot be empty";
    errors.hasErrors = true;
  }

  // Due Date validation (optional, check if it's a valid date if provided)
  if (task.dueDate) {
    if (isNaN(Date.parse(task.dueDate))) {
      errors.dueDate = "Invalid date format";
      errors.hasErrors = true;
    } else {
      // Convert the dueDate to ISO format if it's valid
      task.dueDate = new Date(task.dueDate).toISOString();
    }
  }

  // Priority validation (optional, must be one of the defined values)
  if (
    task.priority &&
    !["low", "moderate", "extreme"].includes(task.priority)
  ) {
    errors.priority = "Priority must be one of 'low', 'moderate', or 'extreme'";
    errors.hasErrors = true;
  }

  // Status validation (optional, must be one of the defined values)
  if (task.status && !["pending", "completed"].includes(task.status)) {
    errors.status = "Status must be 'pending' or 'completed'";
    errors.hasErrors = true;
  }

  // If no errors, set hasErrors to false
  if (!errors.hasErrors) {
    errors.hasErrors = false;
  }

  return errors;
};
