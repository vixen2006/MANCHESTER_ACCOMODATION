import { Route, Routes } from "react-router"
import Page404 from "./pages/Page404"
import ManchesterPage from "./pages/ManchesterPage"
import PropertyDetailPage from "./pages/PropertyDetailPage"
import ThemeToggle from "./components/common/ThemeToggle"
import { ThemeProvider } from "./contexts/ThemeContext"
import { registerSW } from "virtual:pwa-register";
import { useModal } from "./contexts/ModalContext";
import { useEffect, useState } from "react"

function App() {

    const modal = useModal();

    const updateSW = registerSW({
        onNeedRefresh() {
            modal?.CreateModal("New content available", "Please refresh to get the latest content", "Refresh", "Cancel").then((res) => {
                if (res) {
                    updateSW(true);
                }
            }
            );
        },
    });

    const { isLoading, progress } = usePageLoadWaiter();

    if (isLoading) {
        return <div>
            {progress}
        </div>
    }


    return (
        <ThemeProvider>
            <ThemeToggle />
            <Routes>
                <Route path="/" element={<ManchesterPage />} />
                <Route path="/property/:id" element={<PropertyDetailPage />} />
                <Route path="/*" element={<Page404 />} />
            </Routes>
        </ThemeProvider>
    )
}

export default App

// Alternative: Simpler version that just waits for page load
export const usePageLoadWaiter = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleLoad = () => {
            setProgress(100);
            setIsLoading(false);
        };

        const handleProgress = () => {
            // Simulate progress based on document ready state
            if (document.readyState === 'loading') {
                setProgress(33);
            } else if (document.readyState === 'interactive') {
                setProgress(66);
            } else if (document.readyState === 'complete') {
                setProgress(100);
                setIsLoading(false);
            }
        };

        // Check if already loaded
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            // Listen for load events
            window.addEventListener('load', handleLoad);
            document.addEventListener('readystatechange', handleProgress);

            // Initial progress check
            handleProgress();
        }

        return () => {
            window.removeEventListener('load', handleLoad);
            document.removeEventListener('readystatechange', handleProgress);
        };
    }, []);

    return { isLoading, progress };
};
