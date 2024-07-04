import { Dialog, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Loading from "./Loading";
import DialogWrapper from "./DialogWrapper";
import InputBox from "./InputBox";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";

const ChangePassword = ({ open, setOpen }) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

    const handleOnSubmit = async (data) => {
        if (data.password !== data.cpassword) {
            toast.warning("Passwords don't match");
            return;
        }
        try {
            const res = await changeUserPassword({ password: data.password }).unwrap();
            toast.success("Password updated successfully!");
            setTimeout(() => {
                setOpen(false);
            }, 1500);
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || error?.error);
        }
    };
    return (
        <>
            <DialogWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(handleOnSubmit)} className="">
                    <DialogTitle as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
                        Change Password
                    </DialogTitle>
                    <div className="mt-2 flex flex-col gap-6">
                        <InputBox 
                            placeholder="New Password"
                            type="password"
                            name="password"
                            label="New Password"
                            className="w-full rounded"
                            register={register('password', {
                                required: "New Password is required!",
                            })}
                            error={errors?.password ? errors?.password?.message : ""}
                        />
                        <InputBox 
                            placeholder="Confirm New Password"
                            type="password"
                            name="cpassword"
                            label="Confirm New Password"
                            className="w-full rounded"
                            register={register('cpassword', {
                                required: "Confirm New Password is required!",
                            })}
                            error={errors?.cpassword ? errors?.cpassword?.message : ""}
                        />
                    </div>
                    {
                        isLoading ? (
                            <div className="py-5">
                                <Loading />
                            </div>
                        ) : (
                            <div className="py-3 mt-4 flex flex-row gap-3 justify-end">
                                <Button 
                                    type="submit"
                                    className="bg-blue-500 px-8 text-sm font-semibold text-white hover:bg-blue-600 rounded-md"
                                    label="save"
                                />
                                <button
                                    type="button"
                                    className="bg-slate-100 px-5 text-sm font-semibold text-gray-900 sm:w-auto rounded-md"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        )
                    }
                </form>
            </DialogWrapper>
        </>
    )
}

export default ChangePassword