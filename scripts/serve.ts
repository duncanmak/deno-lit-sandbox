import { refresh } from "https://deno.land/x/refresh@1.0.0/mod.ts";
import {
  basename,
  dirname,
  extname,
  format,
  fromFileUrl,
  join,
} from "std/path/mod.ts";

import { exists } from "std/fs/mod.ts";
import { typeByExtension } from "std/media_types/mod.ts";
import { bundle } from "https://deno.land/x/emit@0.34.0/mod.ts";

// Construct the refresh middleware.
const refreshMiddleware = refresh({paths: ['src', 'www']});

const __dirname = fromFileUrl(dirname(import.meta.url));

const notFound = new Response("File not found", {
  status: 404,
  headers: {
    "content-type": "text/plain; charset=utf-8",
  },
});


async function lookup(pathname: string): Promise<Response> {
  const ext = extname(pathname);
  const headers = {
    headers: { "Content-Type": typeByExtension(ext) ?? "text/html" },
  };

  const path = join(__dirname, "..", "www", pathname);
  if (await exists(path, { isFile: true })) {
    return new Response(await Deno.readTextFile(path), headers);
  } else {
    const path = format({
      dir: join(__dirname, "..", "src"),
      ext: "ts",
      name: basename(pathname, "js"),
    });
    
    if (await exists(path, {isFile: true})) {
      const { code } = await bundle(path, {
        compilerOptions: { emitDecoratorMetadata: true, sourceMap: true },
        importMap: "deno.json",
      });
      return new Response(code, headers);
    } else {
      return notFound;
    }
  }
}

// Start a server on port `8000`.
Deno.serve((req: Request) => {
  const res = refreshMiddleware(req);

  if (res) return res;

  const { pathname } = new URL(req.url);

  return lookup(pathname === "/" ? "index.html" : pathname);
});
