export default {
  async addTask(context, task) {
    const userId = context.rootGetters.userId
    const token = context.rootGetters.token
    const selectedCarId = context.rootGetters.selectedCar.id

    const response = await fetch(`https://car-manager-5d9e6-default-rtdb.firebaseio.com/tasks/${userId}/${selectedCarId}.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to add task')
      throw error
    }

    context.commit('addTask', {
      carId: selectedCarId,
      task: {
        ...task,
        id: responseData.name,
      },
    })
  },

  async updateTask(context, task) {
    const userId = context.rootGetters.userId
    const token = context.rootGetters.token
    const selectedCarId = context.rootGetters.selectedCar.id

    const response = await fetch(`https://car-manager-5d9e6-default-rtdb.firebaseio.com/tasks/${userId}/${selectedCarId}/${task.id}.json?auth=${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task.taskInfo),
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to update task')
      throw error
    }

    context.commit('updateTask', {
      ...task.taskInfo,
      carId: selectedCarId,
      id: task.id,
    })
  },

  async loadTasks(context, carId) {
    const userId = context.rootGetters.userId
    const token = context.rootGetters.token

    const response = await fetch(`https://car-manager-5d9e6-default-rtdb.firebaseio.com/tasks/${userId}/${carId}.json?auth=${token}`)

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch tasks')
      throw error
    }

    const tasks = []

    // eslint-disable-next-line no-restricted-syntax
    for (const taskId in responseData) {
      const task = {
        id: taskId,
        ...responseData[taskId],
      }

      tasks.push(task)
    }

    context.commit('setTasks', {
      carId,
      tasks,
    })
  },
}
