import React, { useState } from 'react'
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdKeyboardDoubleArrowUp, MdKeyboardDoubleArrowDown, MdDelete, MdOutlineRestore } from "react-icons/md"
import clsx from 'clsx'
import Title from '../components/Title'
import Button from '../components/Button'
import { ConfirmationDialog } from '../components/Dialogs'
import { PRIORITYSTYELS, TASK_TYPE } from "../utils"
import { useDeleteRestoreTaskMutation, useGetAllTasksQuery } from '../redux/slices/api/taskApiSlice'
import Loading from '../components/Loading'
import { toast } from "sonner"
const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  normal: <MdKeyboardArrowDown />,
  low: <MdKeyboardDoubleArrowDown />,
};

const Trash = () => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");

  const { data, isLoading, refetch } = useGetAllTasksQuery({
    strQuery: "",
    isTrashed: "true",
    search: "",
  });
  const [deleteRestoreTask] = useDeleteRestoreTaskMutation();

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMessage("Do you want to restore the selected item?");
    setOpenDialog(true);
  }
  const restoreAllClick = () => {
    setType("restoreAll");
    setMessage("Do you want to restore all items in the trash?");
    setOpenDialog(true);
  }
  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setMessage("Do you want to permanently delete the task?");
    setOpenDialog(true);
  }
  const deleteAllClick = () => {
    setType("deleteAll");
    setMessage("Do you want to permanently delete all items in the trash?");
    setOpenDialog(true);
  }
  const deleteRestoreHandler = async () => {
    try {
      let result;
      switch (type) {
        case "delete":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "delete",
          }).unwrap();
          break;
        case "deleteAll":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "deleteAll",
          }).unwrap();
          break;
        case "restore":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "restore",
          }).unwrap();
          break;
        case "restoreAll":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "restoreAll",
          }).unwrap();
          break;
      }
      toast.success(result?.message);
      setTimeout(() => {
        setOpenDialog(false);
        refetch();
      }, 500)
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.error);
    }
  }
  if (isLoading) {
    return (
      <div className='py-10'>
        <Loading />
      </div>
    )
  }

  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2'>Stage</th>
        <th className='py-2'>Modified On</th>
      </tr>
    </thead>
  )
  const TableRow = ({ item }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/20'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item.stage])} />
          <p className='w-full line-clamp-1 text-base text-black'>
            {item?.title}
          </p>
        </div>
      </td>
      <td className='py-2'>
        <div className='flex gap-1 items-center'>
          <span className={clsx("text-lg", PRIORITYSTYELS[item?.priority])}>
            {ICONS[item?.priority]}
          </span>
          <span className='capitalize line-clamp-1'>
            {item?.priority}
          </span>
        </div>
      </td>
      <td className='py-2 capitalize text-center md:text-start'>
        {item?.stage}
      </td>
      <td>{new Date(item?.date).toDateString()}</td>
      <td className='flex gap-1 justify-end py-2'>
        <Button
          icon={<MdDelete className='text-xl text-red-600' />}
          onClick={() => restoreClick(item._id)}
        />
        <Button
          icon={<MdOutlineRestore className='text-xl text-green-500' />}
          onClick={() => deleteClick(item._id)}
        />
      </td>
    </tr>
  )
  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <Title title='Trashed Tasks' />

          <div className='flex gap-2 md:gap-4 items-center'>
            <Button
              label='Restore All'
              icon={<MdOutlineRestore className='text-lg hidden md:flex' />}
              className='flex flex-row-reverse gap-1 items-center  text-black text-sm md:text-base rounded-md 2xl:py-2.5'
              onClick={() => restoreAllClick()}
            />
            <Button
              label='Delete All'
              icon={<MdDelete className='text-lg hidden md:flex' />}
              className='flex flex-row-reverse gap-1 items-center  text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5'
              onClick={() => deleteAllClick()}
            />
          </div>
        </div>

        <div className='bg-white px-2 md:px-6 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
              <tbody>
                {data?.tasks?.map((task, id) => (
                  <TableRow key={id} item={task} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        message={message}
        setMessage={setMessage}
        type={type}
        setType={setType}
        onClick={() => deleteRestoreHandler()}
      />
    </>
  )
}

export default Trash