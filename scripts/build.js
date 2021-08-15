// @ts-check
const esbuild = require('esbuild');

(async () => {
  await esbuild.build({
    entryPoints: [`src/popper.ts`],
    bundle: true,
    minify: true,
    platform: `node`,
    format: `cjs`,
    target: `node12`,
    outdir: `build`,
  });
})();
