#!/usr/bin/env node

import prompts from 'prompts';
import degit from 'degit';

async function main() {
  const response = await prompts([
    {
      type: 'select',
      name: 'type',
      message: 'Please select a project type:',
      choices: [
        { title: 'Simple', value: 'simple' },
        { title: 'Monorepo', value: 'monorepo' }
      ],
    },
    {
      type: 'text',
      name: 'dir',
      message: 'Please enter the project name:',
      initial: 'my-app'
    }
  ]);

  if (!response.type || !response.dir) {
    console.log('It has been canceled.');
    return;
  }

  const templateSrc = `geastack-community/mixin-template/${response.type}`;
  console.log(`\nRetrieving template...`);

  const emitter = degit(templateSrc, { cache: false, force: true });
  
  try {
    await emitter.clone(response.dir);
    console.log(`\nDone!`);
    console.log(`cd ${response.dir} && pnpm install`);
  } catch (err) {
    console.error('Download failed:', err.message);
  }
}

main();
