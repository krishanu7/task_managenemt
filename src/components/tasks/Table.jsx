import React, { useState } from 'react'
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown
} from "react-icons/md";
import { BGS, PRIOTITYSTYELS, TASK_TYPE , getInitials} from "../../utils";
import clsx from "clsx"
import UserInfo from "../../components/UserInfo";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  normal: <MdKeyboardArrowDown />,
  low: <MdKeyboardDoubleArrowDown />
};

const Table = ({tasks}) => {
  const [openDialog , setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const deleteClicks =(id) => {
    setSelected(id);
    setOpenDialog(true);
  }
  const deleteHandler = () => {};
  const TableHeader = () => (
    <thead className='w-full border-b border-gray-300'>
      <tr className='w-full text-black  text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2 line-clamp-1'>Created At</th>
        <th className='py-2'>Assets</th>
        <th className='py-2'>Team</th>
      </tr>
    </thead>
  );
  const TableRow = ({task}) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/20'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <p className='w-full line-clamp-2 text-base text-black'>
            {task?.title}
          </p>
        </div>
      </td>

    </tr>
  )
  return (
    <>
      <div>
        <div>
          <table className='w-full'>
            <TableHeader />
            <tbody>
              {
                tasks.map((task, index) => (
                  <TableRow key={index} task={task}/>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Table
