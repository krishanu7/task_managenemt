import React, { useState } from 'react'
import { MdGridView } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { TASK_TYPE } from "../utils/index"
import Loading from "../components/Loading"
import { useParams } from "react-router-dom"
import {tasks} from "../assets/data"
import Button from "../components/Button"
import { IoMdAdd } from "react-icons/io";
import Title from "../components/Title"
import Tabs from '../components/Tabs';
import TaskTitle from '../components/TaskTitle';
import BoardView from '../components/BoardView';
import Table from "../components/tasks/Table"
import AddTask from "../components/tasks/AddTask"
const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> }
]

const Tasks = () => {
  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const status = params?.status || "";

  return loading ? (
    <div className='py-10'><Loading /></div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} Tasks` : "Tasks"} />
        {
          !status && (
            <Button
              onClick={() => setOpen(true)}
              label="Create Task"
              icon={<IoMdAdd />}
              className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
            />
          )
        }
      </div>
      <Tabs tabs={TABS} setSelected={setSelected}>
        {
          !status && (
            <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
              <TaskTitle label="To Do" className={TASK_TYPE.todo} />
              <TaskTitle label="In Progress" className={TASK_TYPE['in progress']} />
              <TaskTitle label="Completed" className={TASK_TYPE.completed} />
            </div>
          )
        }
        {
          selected !== 1 ? (
            <BoardView tasks={tasks} />
          ) : (
            <div className='w-full'>
              <Table tasks={tasks} />
            </div>
          )
        }
      </Tabs>
      <AddTask open={open} setOpen={setOpen} />
    </div>
  )
}

export default Tasks