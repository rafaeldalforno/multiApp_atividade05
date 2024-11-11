import { useState, useEffect } from "react";
import styled from "styled-components";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

const TaskList = styled.ul`
	padding: 0;
	width: 100%;
`;

const TaskItem = styled.li`
	background: var(--bgk-white);
	border-radius: 5px;
	padding: 10px;
	margin-bottom: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	font-size: 16px;
	transition: background-color 0.3s;

	display: flex;
	justify-content: space-between;
	align-items: center;

	&:hover {
		background-color: #f1f1f1;
	}

	button {
		margin-left: 10px;
		background: transparent;
		color: red;
		cursor: pointer;
		font-size: 14px;

		&:hover {
			color: darkred;
		}
	}
`;

const EditInputWrapper = styled.div`
	display: flex;
	align-items: center;
`;

const EditInput = styled.input`
	margin-right: 10px;
	padding: 6px;
	border: 1px solid #ccc;
	border-radius: 5px;
	width: 60%;
	box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
	font-size: 14px;
	transition: border-color 0.3s;

	&:focus {
		border-color: #007bff;
		outline: none;
	}
`;

const ErrorMessage = styled.p`
	color: red;
	font-size: 14px;
`;

export const TodoApp = () => {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const [editingTaskId, setEditingTaskId] = useState(null);
	const [editingTaskText, setEditingTaskText] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		loadTasks();
	}, []);

	const loadTasks = () => {
		const savedTasks = localStorage.getItem("tasks");
		if (savedTasks) {
			setTasks(JSON.parse(savedTasks));
		}
	};

	const saveTasks = (tasks) => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	};

	const addTask = () => {
		if (task.trim() === "") {
			setError("Task cannot be empty.");
			return;
		}
		setError("");
		const newTask = { id: crypto.randomUUID(), text: task };
		const updatedTasks = [...tasks, newTask];
		setTasks(updatedTasks);
		saveTasks(updatedTasks);
		setTask("");
	};

	const deleteTask = (id) => {
		if (window.confirm("Você tem certeza que quer deletar a tarefa?")) {
			const updatedTasks = tasks.filter((task) => task.id !== id);
			setTasks(updatedTasks);
			saveTasks(updatedTasks);
		}
	};

	const editTask = (id, text) => {
		setEditingTaskId(id);
		setEditingTaskText(text);
	};

	const updateTask = () => {
		if (editingTaskText.trim() === "") {
			setError("Task cannot be empty.");
			return;
		}
		setError("");

		const updatedTasks = tasks.map((task) =>
			task.id === editingTaskId ? { ...task, text: editingTaskText } : task
		);

		setTasks(updatedTasks);
		saveTasks(updatedTasks);
		setEditingTaskId(null);
		setEditingTaskText("");
	};

	return (
		<div className="container">
			<h2 className="titleOne">Todo App</h2>
			<Input
				type="text"
				value={task}
				onChange={(e) => setTask(e.target.value)}
				placeholder="Add a new task"
			/>
			<Button onClick={addTask}>Add Task</Button>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<TaskList>
				{tasks.map((task) => (
					<TaskItem key={task.id}>
						{editingTaskId === task.id ? (
							<EditInputWrapper>
								<EditInput
									type="text"
									value={editingTaskText}
									onChange={(e) => setEditingTaskText(e.target.value)}
								/>
								<button onClick={updateTask}>Save</button>
							</EditInputWrapper>
						) : (
							<>
								{task.text}
								<div>
									<button onClick={() => editTask(task.id, task.text)}>
										Edit
									</button>
									<button onClick={() => deleteTask(task.id)}>Delete</button>
								</div>
							</>
						)}
					</TaskItem>
				))}
			</TaskList>
		</div>
	);
};
