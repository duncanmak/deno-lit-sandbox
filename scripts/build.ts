import { bundle } from "https://deno.land/x/emit/mod.ts";

const url = new URL("../src/element.ts", import.meta.url);
const result = await bundle(url.href, { compilerOptions: { emitDecoratorMetadata: true, sourceMap: true
}, importMap: "deno.json"});

Deno.writeTextFileSync(`www/module.js`, result.code);

// for (const [key, value] of result){
//     Deno.writeTextFileSync(`www/${key}.js`, value);
// }
