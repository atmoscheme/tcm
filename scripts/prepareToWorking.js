import { constants, access, writeFile } from 'node:fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


const envContent = `
VITE_CJS_IGNORE_WARNING=true
NUXT_DEV_API_GATEWAY_URL=https://reqres.in
NUXT_API_GATEWAY_URL=https://reqres.in
NUXT_PUBLIC_API_GATEWAY_URL=https://reqres.in
NUXT_SSR_DEBUG=true
`;

/**
 * @returns {boolean}
 */
const checkFile = async (fileName) => {
  try {
    await access(join(__dirname, fileName), constants.R_OK);
    return true;
  } catch {
    return false;
  }
};

const createFile = async (fileName, content) => {
  try {
    await writeFile(join(__dirname, fileName), content);
    // eslint-disable-next-line no-console
    console.info(`${fileName} created`);
  } catch (err) {
    console.error(`${fileName} file is not created`);
    // eslint-disable-next-line no-console
    console.info(`You must create ${fileName} manually with content:`);
    // eslint-disable-next-line no-console
    console.info(content);
  }
};

const run = async () => {
  const hasEnv = await checkFile('../.env');

  if (!hasEnv) {
    await createFile('../.env', envContent);
  }
};

run().then(() => {
  // eslint-disable-next-line no-console
  console.log(`
  ┌───────────────────────────────┐
  |  Now run:                     |
  |   1) pnpm i --frozen-lockfile |
  |   2) pnpm work                |
  └───────────────────────────────┘
  `);
});
