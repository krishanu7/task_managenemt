import React from 'react'
import { useForm } from 'react-hook-form'
import DialogWrapper from "./DialogWrapper"
import { Dialog, DialogTitle } from '@headlessui/react'
import InputBox from "../components/InputBox"
import Loading from "../components/Loading"
import Button from "../components/Button"

const AddUser = ({ open, setOpen, userData }) => {
    const defaultValues = userData ?? {};
    // console.log(userData);
    const { register, handleSubmit, formState: { errors, isLoading } } = useForm({ defaultValues })
    const submitHandler = () => { console.log("Added User") };
    return (
        <DialogWrapper open={open} setOpen={setOpen}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <DialogTitle as='h2' className="text-white bg-orange-400 px-3 py-2 w-fit rounded font-bold leading-6 mb-4">
                    {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
                </DialogTitle>
                <div>
                    <InputBox
                        placeholder="Full name"
                        type="text"
                        name="name"
                        label="Full Name"
                        className="w-full rounded focus:bg-slate-100"
                        register={register("name", { required: "Full name is required!" })}
                        error={errors.name ? errors.name.message : ""}
                    />
                    <InputBox
                        placeholder="Title"
                        type="text"
                        name="title"
                        label="Title"
                        className="w-full rounded focus:bg-slate-100"
                        register={register("title", { required: "Title is required!" })}
                        error={errors.title ? errors.title.message : ""}
                    />
                    <InputBox
                        placeholder='Email Address'
                        type='email'
                        name='email'
                        label='Email Address'
                        className="w-full rounded focus:bg-slate-100"
                        register={register("email", { required: "Email Address is required!", })}
                        error={errors.email ? errors.email.message : ""}
                    />
                    <InputBox
                        placeholder="Role"
                        type="text"
                        name="role"
                        label="Role"
                        className="w-full rounded focus:bg-slate-100"
                        register={register("role", { required: "User role is required!" })}
                        error={errors.role ? errors.role.message : ""}
                    />
                </div>
                {
                    isLoading ? (
                        <div className='-translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                            <Loading />
                        </div>
                    ) : (
                        <div className='py-3 mt-4 sm:flex sm:flex-row-reverse gap-2'>
                            <Button
                                type="submit"
                                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto rounded-md"
                                label="Submit"
                            />
                            <Button
                                type='button'
                                onClick={() => setOpen(false)}
                                className='bg-red-500 hover:bg-red-600 px-5 text-sm font-semibold text-white sm:w-auto rounded-md'
                                label='Cancel'
                            />
                        </div>
                    )
                }
            </form>
        </DialogWrapper>
    )
}

export default AddUser
