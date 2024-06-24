import React, { useState } from 'react'
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp, MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useSelector } from "react-redux"
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../../utils";
import clsx from 'clsx';
import { BiMessageAltDetail } from "react-icons/bi"
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io"
import UserInfo from "../UserInfo"
import AddSubTask from "./AddSubTask"
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
                    <div className={clsx('flex flex-1 gap-3 items-center text-sm font-medium', PRIOTITYSTYELS[task?.priority])}>
                        <span className='text-xl'>{ICONS[task?.priority]}</span>
                        <span className='uppercase'>{task?.priority} Priority</span>
                    </div>
                    {/* TODO: {user?.isAdmin && <TaskDialog task={task} />} */}
                </div>
                <div className='flex flex-col gap-1 my-1'>
                    <div className='flex items-center gap-3 ml-[3px]'>
                        <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task?.stage])} />
                        <h4 className='line-clamp-1 text-black'>{task?.title}</h4>
                    </div>
                    <span className='text-sm text-gray-600 ml-1'>
                        {formatDate(new Date(task?.date))}
                    </span>
                </div>
                <div className='w-full border-t border-gray-200 my-2' />
                <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center gap-3'>
                        <div className='flex gap-1 items-center text-sm text-gray-600'>
                            <BiMessageAltDetail size={20} />
                            <span>{task?.activities?.langth}</span>
                        </div>
                        <div className='flex gap-1 items-center text-sm text-gray-600 '>
                            <MdAttachFile size={20} />
                            <span>{task?.assets?.length}</span>
                        </div>
                        <div className='flex gap-1 items-center text-sm text-gray-600'>
                            <FaList size={15} />
                            <span className='text-[16px] font-semibold'>0/{task?.subTasks?.length}</span>
                        </div>
                    </div>
                    <div className='flex flex-row-reverse'>
                        {task?.team?.map((m, index) => (
                            <div
                                key={index}
                                className={clsx('w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1', BGS[index % BGS?.length])}
                            >
                                <UserInfo user={m} />
                            </div>
                        ))}
                    </div>
                </div>
                {/* sub tasks */}
                {
                    task?.subTasks?.length > 0 ? (
                        <div className='py-4 border-t border-gray-200'>
                            <h5 className='text-base line-clamp-1 text-black'>{task?.subTasks[0].title}</h5>
                            <div className='p-4 space-x-8'>
                                <span className='text-sm text-gray-600'>
                                    {formatDate(new Date(task?.subTasks[0]?.date))}
                                </span>
                                <span className='bg-blue-600/20 px-3 py-1 rounded-full text-blue-700 font-medium'>
                                    {task?.subTasks[0].tag}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className='py-4 border-t border-gray-200'>
                                <span className='text-gray-600'>No Sub Tasks</span>
                            </div>
                        </>
                    )
                }
                <div className='w-full pb-2'>
                    <button 
                        onClick={() => setOpen(true)}
                        disabled={user?.isAdmin ? false : true}
                        className='flex gap-2 items-center text-sm text-gray-700 bg-green-400 rounded-md px-3 py-2 w-fit font-semibold disabled:cursor-not-allowed disabled:text-gray-300'
                    >
                        <IoMdAdd className='text-xl'/>
                        <span className='uppercase'>Add Subtask</span>
                    </button>
                </div>
            </div>
            <AddSubTask open={open} setOpen={setOpen} id={task._id} />
        </>
    )
}

export default TaskCard
