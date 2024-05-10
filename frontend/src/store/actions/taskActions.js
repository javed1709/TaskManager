import axios from "axios";
import { ADD_TASK, DELETE_TASK, GET_TASKS, UPDATE_TASK } from "../actionTypes";

export const fetchTasks = (token) => {
	return async (dispatch) => {
		try {
			const response = await axios.get(
				"http://localhost:3000/api/tasks",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
				},
			);
			console.log(response.data);
			dispatch({ type: GET_TASKS, payload: response.data });
		} catch (error) {
			console.error("Failed to fetch tasks:", error);
		}
	};
};

export const addTask = (formData, token, toast) => {
	console.log(formData, token);
	const config = {
		headers: {
			Authorization: `${token}`,
			"Content-Type": "application/json", // Assuming JSON data is being sent
		},
	};
	return async (dispatch) => {
		try {
			const response = await axios.post(
				"http://localhost:3000/api/tasks",
				formData,
				config,
			);
			dispatch({ type: ADD_TASK });
			dispatch(fetchTasks(token));
			toast({
				title: "Task created.",
				description: "We've created task for you.",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			console.log(response);
		} catch (error) {
			toast({
				title: "Creation faild.",
				description: error.response.data.message,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			console.error("Failed to add task:", error);
		}
	};
};
export const updateTask = (id, data, token, toast) => {
	const config = {
		headers: {
			Authorization: `${token}`,
			"Content-Type": "application/json", // Assuming JSON data is being sent
		},
	};
	return async (dispatch) => {
		try {
			const response = await axios.patch(
				`http://localhost:3000/api/tasks/${id}`,
				data,
				config,
			);
			dispatch(fetchTasks(token));
			toast({
				title: "Task updated.",
				description: "We've updated task for you.",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			console.log(response);
		} catch (error) {
			toast({
				title: "Updating faild.",
				description: error.response.data.message,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			console.error("Failed to update task:", error);
		}
	};
};
export const deleteTask = (id, token, toast) => {
	const config = {
		headers: {
			Authorization: `${token}`,
			"Content-Type": "application/json", // Assuming JSON data is being sent
		},
	};
	return async (dispatch) => {
		try {
			const response = await axios.delete(
				`http://localhost:3000/api/tasks/${id}`,
				config,
			);
			dispatch(fetchTasks(token));
			toast({
				title: "Task deleted.",
				description: "We've deleted task for you.",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			console.log(response);
		} catch (error) {
			toast({
				title: "Deletation faild.",
				description: error.response.data.message,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			console.error("Failed to delete task:", error);
		}
	};
};
