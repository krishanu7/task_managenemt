import React from 'react'
import { useForm } from "react-hook-form"
import DialogWrapper from "../DialogWrapper"
import InputBox from '../InputBox'
import Button from "../Button"
import { useCreateSubTaskMutation } from '../../redux/slices/api/taskApiSlice'
import { toast } from 'sonner'

const AddSubTask = ({ open, setOpen, id }) => {
  const [createSubTask] = useCreateSubTaskMutation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleOnSubmit = async (data) => {
    try {
      const result = await createSubTask({data,id}).unwrap();
      toast.success(result.message);
      window.location.reload();
      setTimeout(() => {
        setOpen(false);
      },500)
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.error);
    }
  };
  return (
    <>
      <DialogWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <span
            as='h2'
            className="text-md font-semibold leading-6 bg-orange-600 rounded-md text-white px-3 py-2 -ml-4"
          >ADD SUB-TASK
          </span>
          <div className='mt-4 -ml-3 flex flex-col gap-6 '>
            <InputBox
              placeholder='Sub-Task title'
              type='text'
              name='title'
              label='Title'
              className='w-full rounded'
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <div className='flex items-center gap-4'>
              <InputBox
                placeholder="Date"
                type="date"
                name="date"
                label="Task Date"
                className="w-full rounded"
                register={register("date", { required: "Date is required!", })}
                error={errors?.tar ? errors.tag.message : ""}
              />
              <InputBox
                placeholder="Tag"
                type="text"
                name="tag"
                label="Tag"
                className="w-full rounded"
                register={register('tag', { required: "Tag is required!" })}
                error={errors.tag ? errors.tag.message : ""}
              />
            </div>
          </div>
          <div className='py-3 mt-4 flex sm:flex-row-reverse gap-4'>
            <Button
              type="submit"
              className="bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 sm:ml-3 sm:w-auto rounded-md"
              label="Add Task"
            />
            <Button
              type='button'
              className='bg-white border text-sm font-semibold text-gray-900 sm:w-auto rounded-md'
              onClick={() => setOpen(false)}
              label='Cancel'
            />
          </div>
        </form>
      </DialogWrapper>
    </>
  )
}

export default AddSubTask
