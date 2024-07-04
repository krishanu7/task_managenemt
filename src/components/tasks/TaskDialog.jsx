import React, { Fragment, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { AiTwotoneFolderOpen } from "react-icons/ai"
import { BsThreeDots } from "react-icons/bs"
import { MdAdd, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiDuplicate } from "react-icons/hi"
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from "@headlessui/react"
import clsx from "clsx"
import AddTask from "./AddTask"
import AddSubTask from "./AddSubTask"
import { ConfirmationDialog } from "../Dialogs"
import { useDuplicateTaskMutation, useTrashTaskMutation } from "../../redux/slices/api/taskApiSlice.js"
import { toast } from 'sonner';

const TaskDialog = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();
  const [deleteTask] = useTrashTaskMutation();
  const [duplicateTask] = useDuplicateTaskMutation();

  const duplicateHandler = async () => {
    try {
      const res = await duplicateTask(task._id).unwrap();
      toast.success(res?.message);
      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500)
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.error);
    }
  };
  const deleteClicks = () => {
    setOpenDialog(true)
  };
  const deleteHandler = async () => {
    try {
      const res = await deleteTask(task._id).unwrap();
      toast.success(res?.message);
      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500)
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.error);
    }
  };

  const items = [
    {
      label: "Open Task",
      icon: <AiTwotoneFolderOpen className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => navigate(`/task/${task._id}`)
    },
    {
      label: "Edit",
      icon: <MdOutlineEdit className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => setOpenEdit(true)
    },
    {
      label: "Add Sub-Task",
      icon: <MdAdd className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => setOpen(true),
    },
    {
      label: "Duplicate",
      icon: <HiDuplicate className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => duplicateHandler(),
    },
  ];

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="inline-flex w-full justify-center rounded-md px-3 py-2 text-md font-medium text-gray-600">
          <BsThreeDots />
        </MenuButton>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <MenuItems className="absolute p-2 right-2/3 top-2/3 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-10">
            <div className='px-1 py-1 space-y-2'>
              {items.map((elem, index) => (
                <MenuItem key={index}>
                  {(props) => (
                    <button
                      onClick={elem?.onClick}
                      className={clsx(
                        "flex group w-full items-center rounded-md px-2 py-2 text-sm border-b border-gray-200",
                        { "bg-blue-500 text-white": props.focus, "text-gray-900": !props.focus }
                      )}
                    >
                      {elem.icon}
                      {elem.label}
                    </button>
                  )}
                </MenuItem>
              ))}
            </div>
            <div className='px-1 py-1'>
              <MenuItem>
                {
                  (props) => (
                    <button
                      onClick={() => deleteClicks()}
                      className={clsx("group flex w-full items-center rounded-md px-2 py-2 text-sm", { "bg-blue-500 text-white": props.focus, "text-red-900": !props.focus })}
                    >
                      <RiDeleteBin6Line className='mr-2 h-5 w-5 text-red-400' aria-hidden="true" />
                      Delete
                    </button>
                  )
                }
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
      <AddTask open={openEdit} setOpen={setOpenEdit} task={task} key={new Date().getTime()} />
      <AddSubTask open={open} setOpen={setOpen} />

      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  )
}

export default TaskDialog
