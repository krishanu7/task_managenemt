import React from 'react'
import TaskCard from "./tasks/TaskCard"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const BoardView = ({ tasks }) => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
            {tasks.map((task, index) => (
                user?.isAdmin ? (
                    <TaskCard key={index} task={task} />
                ) : (
                    <Link key={index} to={`/task/${task._id}`}>
                        <TaskCard task={task} />
                    </Link>
                )
            ))}
        </div>
    );
};

export default BoardView
