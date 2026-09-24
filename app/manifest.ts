import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HWI JDCOEM | Hack With India Student Chapter",
    short_name: "HWI JDCOEM",
    description: "Official student community of Hack With India at JD College of Engineering & Management, Nagpur.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0B",
    theme_color: "#FF1053",
    icons: [
      {
        src: "/hwi-logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/hwi-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
