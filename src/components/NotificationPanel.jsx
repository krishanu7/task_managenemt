import React, { Fragment, useState } from 'react'
import moment from "moment";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react"
import { IoIosNotificationsOutline } from "react-icons/io"
import { HiBellAlert } from "react-icons/hi2";
import { BiSolidMessageRounded } from "react-icons/bi";
import { Link } from "react-router-dom"
import { useGetNotificationsQuery, useMarkNotificationAsReadMutation } from '../redux/slices/api/userApiSlice';
import ViewNotification from "./ViewNotification.jsx"

const ICONS = {
    alert: (
        <HiBellAlert className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
    ),
    message: (
        <BiSolidMessageRounded className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
    ),
};

const NotificationPanel = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const { data, refetch } = useGetNotificationsQuery();
    const [markAsRead] = useMarkNotificationAsReadMutation();
    const readNotificationHandler = async (type, id) => {
        await markAsRead({ type, id }).unwrap();
        refetch();
    }
    const viewNotificationHandler = async (item) => {
        setSelected(item);
        readNotificationHandler("one", item._id);
        setOpen(true);
    }
    const callsToAction = [
        { name: 'Cancel', href: '#', icon: '' },
        {
            name: 'Mark All Read',
            href: '#',
            icon: '',
            onClick: () => readNotificationHandler('all', ''),
        }
    ]

    return (
        <>
            <Popover className="realtive">
                <PopoverButton className="inline-flex items-center outline-none">
                    <div className='w-8 h-8 flex items-center justify-center text-gray-800 relative md:mr-2 pt-2'>
                        <IoIosNotificationsOutline size={32} />
                        {
                            data?.length > 0 && (
                                <span className='absolute text-center top-0 right-0  text-sm text-white font-semibold w-5 h-5 rounded-full bg-red-600'>
                                    {data?.length}
                                </span>
                            )
                        }
                    </div>
                </PopoverButton>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <PopoverPanel className="absolute -right-16 md:right-4 z-10 mt-5 flex w-screen max-w-max px-4">
                        {({ close }) => (
                            data?.length > 0 && (
                                <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                                    <div className="p-4">
                                        {data?.slice(0, 5).map((item, index) => (
                                            <div
                                                key={item._id + index}
                                                className="group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50"
                                            >
                                                <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white">
                                                    {ICONS[item.notiType]}
                                                </div>

                                                <div className="cursor-pointer" onClick={() => viewNotificationHandler(item)}>
                                                    <div className="flex items-center gap-3 font-semibold text-gray-900 capitalize">
                                                        <p>{item.notiType}</p>
                                                        <span className="text-xs font-normal lowercase">
                                                            {moment(item.createdAt).fromNow()}
                                                        </span>
                                                    </div>
                                                    <p className="line-clamp-1 mt-1 text-gray-600">{item.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 divide-x bg-gray-50">
                                        {callsToAction.map((item) => (
                                            <Link
                                                key={item.name}
                                                onClick={
                                                    item?.onClick ? () => item.onClick() : () => close()
                                                }
                                                className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-blue-600 hover:bg-gray-100"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )
                        )}
                    </PopoverPanel>
                </Transition>
            </Popover>
            <ViewNotification open={open} setOpen={setOpen} item={selected} />
        </>
    )
}

export default NotificationPanel
