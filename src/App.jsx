import React, { useState, useEffect, useRef } from 'react';
    import { format, isPast, addMinutes } from 'date-fns';

    const initialTasks = [
      { name: 'Invasao de Bosses', time: '03:00' },
      { name: 'Invasao de Bosses', time: '07:00' },
      { name: 'Invasao de Bosses', time: '10:00' },
      { name: 'Invasao de Bosses', time: '12:00' },
      { name: 'Invasao de Bosses', time: '15:00' },
      { name: 'Invasao de Bosses', time: '17:00' },
      { name: 'Invasao de Bosses', time: '20:00' },
      { name: 'Invasao de EXP', time: '02:40' },
      { name: 'Invasao de EXP', time: '05:40' },
      { name: 'Invasao de EXP', time: '08:40' },
      { name: 'Invasao de EXP', time: '11:40' },
      { name: 'Invasao de EXP', time: '13:40' },
      { name: 'Invasao de EXP', time: '15:40' },
      { name: 'Invasao de EXP', time: '19:40' },
      { name: 'Invasao de EXP', time: '22:40' },
      { name: 'ClickUP Event', time: '13:00' },
      { name: 'ClickUP Event', time: '18:00' },
      { name: 'ClickUP Event', time: '22:00' },
      { name: 'SafeZone', time: '11:00' },
      { name: 'SafeZone', time: '16:00' },
      { name: 'SafeZone', time: '19:00' },
      { name: 'Dice', time: '14:00' },
      { name: 'Dice', time: '17:40' },
    ];

    function App() {
      const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : initialTasks;
      });
      const [newTaskName, setNewTaskName] = useState('');
      const [newTaskTime, setNewTaskTime] = useState('');
      const [dailyChecks, setDailyChecks] = useState(() => {
        const storedChecks = localStorage.getItem('dailyChecks');
        return storedChecks ? JSON.parse(storedChecks) : {};
      });
      const [currentDate, setCurrentDate] = useState(format(new Date(), 'dd/MM/yyyy'));
      const triggeredAlarms = useRef({});

      useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }, [tasks]);

      useEffect(() => {
        localStorage.setItem('dailyChecks', JSON.stringify(dailyChecks));
      }, [dailyChecks]);

      useEffect(() => {
        const checkAlarms = () => {
          tasks.forEach(task => {
            const taskTime = new Date();
            const [hours, minutes] = task.time.split(':').map(Number);
            taskTime.setHours(hours);
            taskTime.setMinutes(minutes);
            taskTime.setSeconds(0);

            const now = new Date();
            const tenMinutesBefore = addMinutes(taskTime, -10);
            const fiveMinutesBefore = addMinutes(taskTime, -5);
            const taskKey = `${task.name}-${task.time}`;

            if (now >= tenMinutesBefore && now < addMinutes(tenMinutesBefore, 1) && !triggeredAlarms.current[taskKey + '-10']) {
              alert(`Alarm for ${task.name} at ${task.time} (10 minutes before)`);
              triggeredAlarms.current[taskKey + '-10'] = true;
            } else if (now >= fiveMinutesBefore && now < addMinutes(fiveMinutesBefore, 1) && !triggeredAlarms.current[taskKey + '-5']) {
              alert(`Alarm for ${task.name} at ${task.time} (5 minutes before)`);
              triggeredAlarms.current[taskKey + '-5'] = true;
            }
             else if (now >= taskTime && now < addMinutes(taskTime, 1) && !triggeredAlarms.current[taskKey]) {
              alert(`Alarm for ${task.name} at ${task.time}`);
              triggeredAlarms.current[taskKey] = true;
            }
          });
        };

        const intervalId = setInterval(checkAlarms, 60000);
        checkAlarms();

        return () => clearInterval(intervalId);
      }, [tasks]);

      useEffect(() => {
        const checkDailyChecks = () => {
          const now = new Date();
          const today = format(now, 'yyyy-MM-dd');
          const updatedChecks = { ...dailyChecks };

          Object.keys(updatedChecks).forEach(key => {
            if (key !== today) {
              delete updatedChecks[key];
            }
          });

          setDailyChecks(updatedChecks);
        };

        checkDailyChecks();
      }, []);

      const handleAddTask = () => {
        if (newTaskName && newTaskTime) {
          setTasks([...tasks, { name: newTaskName, time: newTaskTime }]);
          setNewTaskName('');
          setNewTaskTime('');
        }
      };

      const handleRemoveTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
      };

      const handleCheckDaily = (taskName, taskTime) => {
        const now = new Date();
        const today = format(now, 'yyyy-MM-dd');
        const taskKey = `${taskName}-${taskTime}`;
        const updatedChecks = { ...dailyChecks };

        if (!updatedChecks[today]) {
          updatedChecks[today] = {};
        }

        updatedChecks[today][taskKey] = !updatedChecks[today][taskKey];
        setDailyChecks(updatedChecks);
      };

      const isDailyCheckOverdue = (taskName, taskTime) => {
        const now = new Date();
        const today = format(now, 'yyyy-MM-dd');
        const checkTime = new Date();
        checkTime.setHours(23);
        checkTime.setMinutes(50);
        checkTime.setSeconds(0);
        const taskKey = `${taskName}-${taskTime}`;

        if (now > checkTime && !dailyChecks[today]?.[taskKey]) {
          return true;
        }
        return false;
      };

      const isTaskFinished = (task) => {
        const now = new Date();
        const [hours, minutes] = task.time.split(':').map(Number);
        const taskTime = new Date();
        taskTime.setHours(hours);
        taskTime.setMinutes(minutes);
        taskTime.setSeconds(0);

        if (task.name.includes('Invasao de EXP')) {
          const endTime = addMinutes(taskTime, 25);
          return now > endTime;
        }

        return now > taskTime;
      };

      const sortedTasks = [...tasks].sort((a, b) => {
        const [hoursA, minutesA] = a.time.split(':').map(Number);
        const [hoursB, minutesB] = b.time.split(':').map(Number);
        const timeA = hoursA * 60 + minutesA;
        const timeB = hoursB * 60 + minutesB;
        return timeA - timeB;
      });

      return (
        <div>
          <div className="header">
            <h1>To-Do List</h1>
            <div className="current-date">{currentDate}</div>
          </div>
          <div className="add-task-form">
            <input
              type="text"
              placeholder="Task Name"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
            <input
              type="time"
              value={newTaskTime}
              onChange={(e) => setNewTaskTime(e.target.value)}
            />
            <button onClick={handleAddTask}>Add Task</button>
          </div>
          <ul className="task-list">
            {sortedTasks.map((task, index) => (
              <li
                key={index}
                className={`task-item ${
                  dailyChecks[format(new Date(), 'yyyy-MM-dd')]?.[
                    `${task.name}-${task.time}`
                  ]
                    ? 'completed'
                    : ''
                } ${isDailyCheckOverdue(task.name, task.time) ? 'overdue' : ''} ${
                  isTaskFinished(task) ? 'finished' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={
                    dailyChecks[format(new Date(), 'yyyy-MM-dd')]?.[
                      `${task.name}-${task.time}`
                    ] || false
                  }
                  onChange={() => handleCheckDaily(task.name, task.time)}
                />
                <span>{task.name} - {task.time}</span>
                <button onClick={() => handleRemoveTask(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    export default App;
