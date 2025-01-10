import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const switchPage = (pageDisplayingDiv: Element, router: AppRouterInstance, route: string) => {
    if (pageDisplayingDiv) {
        // Start periodic checks for the scroll position
        const checkScroll = setInterval(() => {
            if (pageDisplayingDiv.scrollTop === 0) {
                clearInterval(checkScroll); // Stop checking
                router.push(route);
            }
        }, 50); // Check every 50ms

        // Trigger the smooth scroll
        pageDisplayingDiv.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        router.push(route);
    }
}

export {switchPage};
