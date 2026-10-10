import { useEffect, useState } from "react";

function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideTimer = window.setTimeout(() => setVisible(false), 1100);
    return () => window.clearTimeout(hideTimer);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100001] flex items-center justify-center bg-[#FAF7F3] transition-opacity duration-300"
      role="status"
    >
      <div aria-hidden="true" className="three-box-loader">
        <span />
        <span />
        <span />
      </div>
      <span className="sr-only">Loading portfolio</span>
    </div>
  );
}

export default LoadingScreen;
