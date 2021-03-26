import {
  adapterFactory,
  dirname, 
  engineFactory,
  viewEngine
} from '../deps.ts';

const viewRoot = dirname(new URL(import.meta.url).pathname) + '/../view';
const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

export const viewEngineFn = viewEngine(oakAdapter, ejsEngine, { useCache: true, viewRoot, viewExt: '.ejs' });
