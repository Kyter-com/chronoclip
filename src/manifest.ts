import { defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "chronoclip",
  version: "0.0.1",
  action: { default_popup: "src/index.html" },
  description:
    "chronoclip allows you to input a timestamp in a variety of date formats and copy the result to your clipboard from any of the resulting formats.",
  icons: {
    16: "icon-16.png",
    32: "icon-32.png",
    48: "icon-48.png",
    128: "icon-128.png",
  },
});

export default manifest;
