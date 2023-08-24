import Header from "./Header";
import Task from "./Task";
import { useDrop } from "react-dnd";
import toast from "react-hot-toast";

const Section = ({ status, tasks, setTasks, todo, inProgress, completed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let bg = "bg-slate-500";
  let tasksToMap = todo;

  if (status === "inProgress") {
    text = "In Progress";
    bg = "bg-purple-500";
    tasksToMap = inProgress;
  }
  if (status === "completed") {
    text = "Completed";
    bg = "bg-green-500";
    tasksToMap = completed;
  }

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const modifiedTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(modifiedTasks));

      toast("task status changed", { icon: "😮" });
      return modifiedTasks;
    });
  };
  return (
    <div
      ref={drop}
      className={`w-64 rounded-md p-2 ${isOver ? "bg-blue-100" : ""}`}>
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};

export default Section;
