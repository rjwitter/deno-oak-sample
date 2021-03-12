import { dirname } from 'https://deno.land/std@0.89.0/path/mod.ts';
import { adapterFactory, engineFactory, viewEngine } from 'https://deno.land/x/view_engine@v1.4.5/mod.ts';

const viewRoot = dirname(new URL(import.meta.url).pathname) + '/../view';
const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

export const viewEngineFn = viewEngine(oakAdapter, ejsEngine, { useCache: true, viewRoot, viewExt: '.ejs' });
