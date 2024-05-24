import { eventBus } from "./eventBus";

export const showErrorMessage = (error) => {
  let errorMessage = error || "Something went wrong!";

  if (error.response) {
    errorMessage = error.response.data.message;
  }

  eventBus.emit("toast", {
    type: "Error",
    message: errorMessage,
  });
};

export const showSuccessMessage = (response) => {
  let successMessage = response || "Success";

  if (response.data) {
    successMessage = response.data.message;
  }

  eventBus.emit("toast", {
    type: "Success",
    message: successMessage,
  });
};
