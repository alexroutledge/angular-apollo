import { writeFile } from 'fs';

const targetPath = `./src/client/environments/environment.ts`;
const envConfigFile = `
export const environment = {
  port: ${process.env.PORT},
  production: false
};
`;

writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});