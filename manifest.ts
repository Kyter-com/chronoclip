import { defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "remurl",
  version: "0.0.1",
  action: { default_popup: "index.html" },
});

export default manifest;
