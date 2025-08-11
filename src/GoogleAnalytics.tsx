import { useEffect } from "react";

const GoogleAnalytics = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-57D8SX8HGP";
    script.async = true;
    script.onload = () => {
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", "G-57D8SX8HGP");
    };
    document.head.appendChild(script);
  }, []);

  return null;
};

export default GoogleAnalytics;
