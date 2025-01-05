"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OpenedTab from "./OpenedTab";

const Notification = ({ message, onClose }: { message: string; onClose: () => void }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            setTimeout(onClose, 500); // Wait for fade-out animation to finish before calling onClose
        }, 3000); // Auto-close after 3 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg transition-all duration-500 
                ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
        >
            {message}
        </div>
    );
};

const Tabs = () => {
    const HOMEPAGE = "About";

    const pathName = usePathname();
    const router = useRouter();

    const [tabs, setTabs] = useState<Map<string, string>>(new Map([[HOMEPAGE, "/"]]));
    const [currentTab, setCurrentTab] = useState<string>(HOMEPAGE);
    const [notification, setNotification] = useState<string | null>(null);
    const [beforePath, setBeforePath] = useState<string>('');
    const [closedTab, setClosedTab] = useState<string>('');

    // Derive the current page name
    useEffect(() => {
        const slashSplitArr = pathName.split("/");
        const pageName =
            slashSplitArr[1] === ""
                ? HOMEPAGE
                : slashSplitArr
                    .slice(1)
                    .map((segment) => segment.toUpperCase())
                    .join(" / ");

        setCurrentTab(pageName);

        // Add the current page to tabs if not already present
        setTabs((prevTabs) => {
            if (!prevTabs.has(pageName)) {
                const updatedTabs = new Map(prevTabs);
                updatedTabs.set(pageName, pathName);
                return updatedTabs;
            }
            return prevTabs;
        });
    }, [pathName, HOMEPAGE]);

    const closeTab = (tabName: string) => {
        if (tabName === HOMEPAGE) {
            setNotification("You cannot close this tab!");
            return;
        }

        setTabs((prevTabs) => {
            let beforePathTemp = "";
            const updatedTabs = new Map(prevTabs);
            const tabsArray = Array.from(updatedTabs.keys());

            // Find the index of the tab to be closed
            const closingTabIndex = tabsArray.indexOf(tabName);

            // Determine the tab before the closing tab (if it exists)
            if (closingTabIndex > 0) {
                const beforeTab = tabsArray[closingTabIndex - 1];
                beforePathTemp = updatedTabs.get(beforeTab) || "/";
            } else if (tabsArray.length > 1) {
                // If there is no "before" tab, try the next tab
                const nextTab = tabsArray[closingTabIndex + 1];
                beforePathTemp = updatedTabs.get(nextTab) || "/";
            } else {
                // Fallback to the homepage if no adjacent tabs exist
                beforePathTemp = "/";
            }
            // Remove the closing tab from the Map
            updatedTabs.delete(tabName);
            setBeforePath(beforePathTemp);
            return updatedTabs;
        });

        setClosedTab(tabName);
    };

    useEffect(()=> {
        if(closedTab === currentTab) {
            router.push(beforePath);
        }
        setClosedTab('');
    }, [tabs]);

    const switchTab = (tabPath: string) => {
        router.push(tabPath);
    };

    return (
        <div className="relative">
            {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
            <div className="flex items-center">
                {Array.from(tabs.entries()).map(([tabName, tabPath]) => (
                    <OpenedTab
                        key={tabName}
                        tabName={tabName}
                        closeTab={() => closeTab(tabName)}
                        showTab={() => switchTab(tabPath)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Tabs;
