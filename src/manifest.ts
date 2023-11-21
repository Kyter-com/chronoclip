import { defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "chronoclip",
  version: "1.0.1",
  action: { default_popup: "src/index.html" },
  description:
    "chronoclip transforms timestamps into 6 different formats. Input in UNIX, ISO, or Natural Language format.",
  icons: {
    16: "icon-16.png",
    32: "icon-32.png",
    48: "icon-48.png",
    128: "icon-128.png",
  },
});

export default manifest;
