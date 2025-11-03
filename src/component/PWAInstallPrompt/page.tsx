"use client";
import { useEffect, useState } from "react";

// const PWAInstallPrompt = () => {
//   const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
//   const [showPrompt, setShowPrompt] = useState(false);

//   useEffect(() => {
//     const handler = (e: any) => {
//       e.preventDefault();
//       setDeferredPrompt(e);
//       setShowPrompt(true);
//     };

//     window.addEventListener("beforeinstallprompt", handler);

//     return () => {
//       window.removeEventListener("beforeinstallprompt", handler);
//     };
//   }, []);

//   const installApp = async () => {
//     if (!deferredPrompt) return;

//     deferredPrompt.prompt();
//     const { outcome } = await deferredPrompt.userChoice;

//     if (outcome === "accepted") {
//       setDeferredPrompt(null);
//       setShowPrompt(false);
//     }
//   };

//   if (!showPrompt) return null;

//   return (
//     <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border">
//       <p>Install our app for a better experience!</p>
//       <button
//         onClick={installApp}
//         className="bg-primaryCol text-white px-4 py-2 rounded mt-2"
//       >
//         Install App
//       </button>
//       <button
//         onClick={() => setShowPrompt(false)}
//         className="ml-2 text-gray-500"
//       >
//         Not Now
//       </button>
//     </div>
//   );
// };

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  const isEntriPage = () => {
    return window.location.pathname === "/entri";
  };

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // Only show prompt on /entri page
      if (isEntriPage()) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  // Listen for route changes
  useEffect(() => {
    const handleRouteChange = () => {
      if (!isEntriPage()) {
        setShowPrompt(false);
      }
    };

    // For SPA navigation
    window.addEventListener("popstate", handleRouteChange);

    // For manual checks (fallback)
    const interval = setInterval(() => {
      if (!isEntriPage() && showPrompt) {
        setShowPrompt(false);
      }
    }, 1000);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      clearInterval(interval);
    };
  }, [showPrompt]);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border">
      <p>Install our app for a better experience!</p>
      <button
        onClick={installApp}
        className="bg-primaryCol text-white px-4 py-2 rounded mt-2"
      >
        Install App
      </button>
      <button
        onClick={() => setShowPrompt(false)}
        className="ml-2 text-gray-500"
      >
        Not Now
      </button>
    </div>
  );
};

export default PWAInstallPrompt;
