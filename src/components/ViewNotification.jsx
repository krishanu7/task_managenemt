import DialogWrapper from "./DialogWrapper.jsx"
import { DialogTitle } from "@headlessui/react"
import Button from "./Button.jsx"

const ViewNotification = ({open, setOpen, item}) => {
  return (
    <DialogWrapper open={open} setOpen={setOpen}>
      <div className="py-2 px-3 w-full max-w-lg flex flex-col gap-4 items-center justify-center">
      <DialogTitle 
          as="h3" 
          className="font-semibold text-xl text-gray-900 w-full py-2 px-4 border-b border-gray-300 text-center"
        >
          {item?.task?.title ?? "Notification"}
        </DialogTitle>

        <p className="text-start text-gray-500 text-sm leading-relaxed">
          {item?.text}
        </p>
        <Button 
          type="button"
          className="bg-blue-600 px-8 py-2 mt-3 text-sm font-semibold text-white sm:w-auto rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => setOpen(false)}
          label="Ok"
        />
      </div>
    </DialogWrapper>
  )
}

export default ViewNotification
