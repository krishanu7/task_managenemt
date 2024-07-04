import React, { useState } from 'react'
import DialogWrapper from '../DialogWrapper';
import { DialogTitle } from '@headlessui/react';
import InputBox from '../InputBox';
import { useForm } from 'react-hook-form';
import UserList from "./UserList";
import SelectList from "../SelectList"
import { BiImages } from "react-icons/bi"
import Button from '../Button';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../utils/firebase.js"
import { toast } from "sonner";
import { useCreateTaskMutation, useUpdateTaskMutation } from '../../redux/slices/api/taskApiSlice.js';
import { dateFormatter } from '../../utils/index.js';
const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadedFileUrls = [];

const AddTask = ({ open, setOpen, task}) => {

  const defaultValues = {
    title: task?.title || "",
    date: dateFormatter(task?.date || new Date()),
    team: [],
    stage: "",
    priority: "",
    assets: [],
  }
  const { register, handleSubmit, formState: { errors } } = useForm({defaultValues});
  const [team, setTeam] = useState(task?.team || [])
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORIRY[2]);
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const URLS = task?.assets ? [...task.assets] : [];


  const submitHandler = async (data) => {
    for (const file of assets) {
      setUploading(true);
      try {
        await uploadFile(file);
      } catch (error) {
        console.error("Error on uploading file", error.message);
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    try {
      const newData = {
        ...data,
        assets: [...URLS, ...uploadedFileUrls],
        team,
        stage,
        priority,
      };

      const result = task?._id
        ? await updateTask({ ...newData, _id: task._id }).unwrap()
        : await createTask(newData).unwrap();

      toast.success(result.message);
      setTimeout(() => {
        setOpen(false);
      }, 500);
    } catch (error) {
      console.error("Error in submitHandler:", error);
      toast.error("Failed to create or update the task");
    }
  };

  const handleCancel = () => {
    setOpen(false);
  }
  
  const handleSelect = (e) => {
    setAssets(e.target.files)
  }
  const uploadFile = async (file) => {
    const storage = getStorage(app);
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log('File available at', downloadURL);
              uploadedFileUrls.push(downloadURL);
              resolve();
            }).catch((error) => {
              reject(error);
            });
        }
      )
    })
  }
  return (
    <>
      <DialogWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <DialogTitle as='h2'
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >{task ? "UPDATE TASK" : "ADD TASK"}</DialogTitle>
          <div className='mt-2 flex flex-col gap-6'>
            <InputBox
              placeholder='Task Title'
              type='text'
              name='title'
              label='Task Title'
              className='w-full rounded'
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setTeam} team={team} />

            <div className='flex gap-4'>
              <SelectList
                label="Task Stage"
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />
              <div className='w-full'>
                <InputBox placeholder='Date'
                  type='date'
                  name='date'
                  label='Task Date'
                  className='w-full rounded'
                  register={register("date", {
                    required: "Date is required!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className='flex gap-4'>
              <SelectList
                label='Priority Level'
                lists={PRIORIRY}
                selected={priority}
                setSelected={setPriority}
              />

              <div className='w-full flex items-center justify-center mt-4'>
                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                  htmlFor='imgUpload'
                >
                  <input
                    type='file'
                    className='hidden'
                    id='imgUpload'
                    onChange={(e) => handleSelect(e)}
                    accept='.jpg, .png, .jpeg'
                    multiple={true}
                  />
                  <BiImages />
                  <span>Add Assets</span>
                </label>
              </div>
            </div>

            <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
              {uploading ? (
                <span className='text-sm py-2 text-red-500'>
                  Uploading assets
                </span>
              ) : (
                <Button
                  label="Submit"
                  type="submit"
                  className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
                />
              )}
              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={handleCancel}
                label="Cancel"
              />
            </div>
          </div>
        </form>
      </DialogWrapper>
    </>
  )
}

export default AddTask
