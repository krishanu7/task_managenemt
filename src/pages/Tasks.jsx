import React, { useState } from 'react'
import { MdGridView } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { TASK_TYPE } from "../utils/index"
import Loading from "../components/Loading"
import { useParams } from "react-router-dom"
import { IoMdAdd } from "react-icons/io";
import Title from "../components/Title"
import Tabs from '../components/Tabs';
import TaskTitle from '../components/TaskTitle';
import BoardView from '../components/BoardView';
import Table from "../components/tasks/Table"
import AddTask from "../components/tasks/AddTask"
import { useGetAllTasksQuery } from '../redux/slices/api/taskApiSlice';
import { useSelector } from 'react-redux';
const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> }
]

const Tasks = () => {
  const { user } = useSelector((state) => state.auth);
  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const status = params?.status || "";

  const { data, isLoading } = useGetAllTasksQuery({
    strQuery: status,
    isTrashed: "",
    search: "",
  });

  return isLoading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <button
            onClick={() => setOpen(true)}
            disabled={user?.isAdmin ? false : true}
            className='flex gap-1 items-center bg-blue-600 text-white rounded-md py-2 px-3 mr-2 2xl:py-2.5 w-fit disabled:bg-blue-300 disabled:text-slate-100 disabled:cursor-not-allowed'
          >
            <IoMdAdd className='text-lg' /> Create Task
          </button>
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
            <TaskTitle label='To Do' className={TASK_TYPE.todo} />
            <TaskTitle
              label='In Progress'
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle label='completed' className={TASK_TYPE.completed} />
          </div>
        )}

        {selected !== 1 ? (
          <BoardView tasks={data?.tasks} />
        ) : (
          <div className='w-full'>
            <Table tasks={data?.tasks} />
          </div>
        )}
      </Tabs>
      <AddTask open={open} setOpen={setOpen} />
    </div>
  )
}

export default Tasks