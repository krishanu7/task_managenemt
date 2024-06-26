import React from 'react'
import DialogWrapper from './DialogWrapper';
import { DialogTitle } from '@headlessui/react';
import { FaQuestion } from "react-icons/fa"
import Button from './Button';
import clsx from 'clsx';


const ConfirmationDialog = ({
    open,
    setOpen,
    message,
    type = "delete",
    onClick = () => { },
    setMessage = () => { },
    setType = () => { },
}) => {
    const closeDialog = () => {
        setType("delete");
        setMessage(null);
        setOpen(false);
    }
    return (
        <DialogWrapper open={open} setOpen={closeDialog}>
            <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
                <p
                    className={clsx(
                        "p-3 rounded-full ",
                        type === "restore" || type === "restoreAll"
                            ? "text-yellow-600 bg-yellow-100"
                            : "text-red-600 bg-red-200"
                    )}
                >
                    <FaQuestion size={60} />
                </p>

                <p className='text-center text-gray-500'>
                    {message ?? "Are you sure you want to delete the selected record?"}
                </p>

                <div className='bg-gray-50 py-3 sm:flex sm:flex-row-reverse gap-4'>
                    <Button
                        type='button'
                        className={clsx(
                            " px-8 text-sm font-semibold text-white sm:w-auto",
                            type === "restore" || type === "restoreAll"
                                ? "bg-yellow-600"
                                : "bg-red-600 hover:bg-red-500"
                        )}
                        onClick={onClick}
                        label={type === "restore" ? "Restore" : "Delete"}
                    />

                    <Button
                        type='button'
                        className='bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border'
                        onClick={() => closeDialog()}
                        label='Cancel'
                    />
                </div>
            </div>
        </DialogWrapper>
    );
}
const UserAction = ({ open, setOpen, onClick = () => { } }) => {
    const closeDialog = () => {
        setOpen(false);
    }
    return (
        <DialogWrapper open={open} setOpen={closeDialog}>
            <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
                <p className={clsx("P-3 rounded-full", "text-red-600 bg-red-200")}><FaQuestion size={60} /></p>
                <p className='text-center text-gray-500'>
                    {"Are your sure you want to activate or deactivate this account ?"}
                </p>
            </div>
            <div>
                <Button
                    type="button"
                    className="px-8 text-sm font-semibold text-white sm:w-auto bg-red-600 hover:bg-red-500"
                    onClick={onClick}
                    label="Yes"
                />
                <Button
                    type='button'
                    className='bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border'
                    onClick={() => closeDialog()}
                    label='No'
                />
            </div>
        </DialogWrapper>
    )
}
export { ConfirmationDialog, UserAction };
