import React from 'react'
import { useForm } from 'react-hook-form'
import DialogWrapper from "./DialogWrapper"
import { DialogTitle } from '@headlessui/react'
import InputBox from "../components/InputBox"
import Loading from "../components/Loading"
import Button from "../components/Button"
import { useRegisterMutation } from '../redux/slices/api/authApiSlice'
import { useUpdateMutation } from '../redux/slices/api/userApiSlice'
import { generatePassword } from '../utils'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setCredentials } from "../redux/slices/authSlice.js"
const AddUser = ({ open, setOpen, userData }) => {
    const defaultValues = userData ?? {};
    // console.log(userData);
    const password = generatePassword();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues })
    const [addNewUser, { isLoading }] = useRegisterMutation();
    const [updateUser, { isLoading: isUpdating }] = useUpdateMutation();
    const submitHandler = async (data) => {
        try {//TODO: After adding user admin is loggin out 
            if (userData) {
                const result = await updateUser(data).unwrap();
                toast.success(result?.message);
                dispatch(setCredentials(result?.user));
                // if (userData?._id === result.user._id)
            } else {
                const result = await addNewUser({ ...data, password }).unwrap();
                //TODO: Send through email also
                toast.success("New User added successfully");
            }
            setTimeout(() => {
                setOpen(false);
            }, 1000)
        } catch (error) {
            toast.error("Something went wrong");
        }
    };
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
                        <Loading />
                    ) : (
                        <div className='py-3 mt-4 flex justify-end gap-2'>
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
