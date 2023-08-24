import React, { useEffect, useState } from "react";

import Section from "./Section";

const ListTasks = ({ tasks, setTasks }) => {
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const getTodo = tasks.filter((task) => task.status === "todo");
    const getInProgress = tasks.filter((task) => task.status === "inProgress");
    const getCompleted = tasks.filter((task) => task.status === "completed");

    setTodo(getTodo);
    setInProgress(getInProgress);
    setCompleted(getCompleted);
  }, [tasks]);

  const statuses = ["todo", "inProgress", "completed"];
  return (
    <div className="flex gap-16">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todo={todo}
          inProgress={inProgress}
          completed={completed}
        />
      ))}
    </div>
  );
};

export default ListTasks;
