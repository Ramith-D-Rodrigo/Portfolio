"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OpenedTab from "./OpenedTab";
import Notification from "./Notification";
import { switchPage } from "../utils/utilFunctions";
import { IDE_ROOT } from "../ide/constants";

const Tabs = () => {
    const HOMEPAGE = "About";

    const pathName = usePathname();
    const router = useRouter();

    const [tabs, setTabs] = useState<Map<string, string>>(new Map([[HOMEPAGE, IDE_ROOT]]));
    const [currentTab, setCurrentTab] = useState<string>(HOMEPAGE);
    const [notification, setNotification] = useState<string | null>(null);
    const [beforePath, setBeforePath] = useState<string>('');
    const [closedTab, setClosedTab] = useState<string>('');

    // Derive the current page name
    useEffect(() => {
        let pageName = Array.from(tabs.entries()).find(([key, value]) => value === pathName)?.[0];

        if (pageName) {
            setCurrentTab(pageName);
            return;
        }


        const slashSplitArr = pathName.split("/");
        pageName =
            slashSplitArr[1] === IDE_ROOT
                ? HOMEPAGE
                : slashSplitArr
                    .slice(2)
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

    useEffect(() => {
        if (closedTab === '') {
            return;
        }

        if (closedTab === currentTab) {
            const pageDisplayingDiv = document.querySelector("#pageDisplayer");
            switchPage(pageDisplayingDiv, router, beforePath);
        }
        setClosedTab('');
    }, [closedTab]);

    const switchTab = async (tabName: string) => {
        console.log(currentTab);
        if (tabName === currentTab) {
            return;
        }
        const pageDisplayingDiv = document.querySelector("#pageDisplayer");
        if (pageDisplayingDiv) {
            // Start periodic checks for the scroll position
            const checkScroll = setInterval(() => {
                if (pageDisplayingDiv.scrollTop === 0) {
                    clearInterval(checkScroll); // Stop checking
                    router.push(tabs.get(tabName) as string); // Navigate to the new tab
                }
            }, 50); // Check every 50ms

            // Trigger the smooth scroll
            pageDisplayingDiv.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            router.push(tabs.get(tabName) as string); // Fallback if div is not available
        }
    };

    return (
        <div>
            {notification && <Notification message={notification} onClose={() => setNotification(null)} color="red" />}
            <div className="flex items-center position-fixed">
                {Array.from(tabs.keys()).map((tabName) => (
                    <OpenedTab
                        key={tabName}
                        tabName={tabName}
                        closeTab={() => closeTab(tabName)}
                        showTab={() => switchTab(tabName)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Tabs;
