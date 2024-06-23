import React, { useState } from 'react'
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp, MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useSelector } from "react-redux"
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../../utils";
import clsx from 'clsx';

const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    normal: <MdKeyboardArrowDown />,
    low: <MdKeyboardDoubleArrowDown />
};

const TaskCard = ({ task }) => {
    const { user } = useSelector((state) => state.auth)
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className='w-full h-fit bg-white shadow-md p-4 rounded'>
                <div className='w-full flex justify-between'>
                    <div className={clsx('flex flex-1 gap-1 items-center text-sm font-medium', PRIOTITYSTYELS[task?.priority])}>
                        <span className='text-lg'>{ICONS[task?.priority]}</span>
                        <span className='uppercase'>{task?.priority} Priority</span>
                    </div>
                </div>
                {/* TODO: {user?.isAdmin && <TaskDialog task={task} />} */}
            </div>
        </>
    )
}

export default TaskCard
