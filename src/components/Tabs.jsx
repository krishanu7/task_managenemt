import { TabGroup, TabList, Tab, TabPanel } from "@headlessui/react"
import clsx from "clsx"

const Tabs = ({ tabs, setSelected, children }) => {
    return (
        <div className="w-full px-1 sm:px-0">
            <TabGroup >
                <TabList className="flex space-x-6 rounded-xl p-1">
                    {
                        tabs.map((tab, index) => (
                            <Tab key={index} onClick={() => setSelected(index)} className={(props) =>
                                clsx(
                                    "w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white",
                                    {
                                        "text-blue-700 border-b-2 border-blue-600": props.selected,
                                        "text-gray-800 hover:text-blue-800": !props.selected,
                                    }
                                )
                            }>
                                {tab.icon}
                                <span>{tab.title}</span>
                            </Tab>
                        ))
                    }
                </TabList>
                <TabPanel className='w-full mt-2'> {children}</TabPanel>
            </TabGroup>
        </div>
    )
}

export default Tabs
