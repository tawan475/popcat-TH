// @ts-check
const esbuild = require("esbuild");

(async () => {
  await esbuild.build({
    entryPoints: [`src/popper.ts`],
    bundle: true,
    platform: `node`,
    format: `cjs`,
    watch: {
      onRebuild: (err, res) => {
        if (err) console.error("watch build failed:", err);
        else console.log("watch build succeeded:", res);
      },
    },
    outdir: `dist`,
  });
})();
