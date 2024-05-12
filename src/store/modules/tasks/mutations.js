export default {
  addTask(state, taskData) {
    const carId = taskData.carId
    const newAddedTask = taskData.task
    const carIndex = state.tasks.findIndex(car => car.id === carId)

    if (carIndex !== -1) {
      state.tasks[carIndex].tasks.push(newAddedTask)
    }
    else {
      state.tasks.push({
        id: carId.toString(),
        tasks: [newAddedTask],
      })
    }
  },
  setTasks(state, taskData) {
    const carId = taskData.carId
    const loadedTasks = taskData.tasks

    state.tasks.push({
      id: carId.toString(),
      tasks: loadedTasks,
    })
  },
  updateTask(state, taskData) {
    const carId = taskData.carId
    const updatedTask = taskData
    const carIndex = state.tasks.findIndex(car => car.id === carId)
    const taskIndex = state.tasks[carIndex].tasks.findIndex(task => task.id === updatedTask.id)

    state.tasks[carIndex].tasks[taskIndex] = updatedTask
  },
}
