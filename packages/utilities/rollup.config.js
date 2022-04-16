import { terser } from "rollup-plugin-terser";
import { resolve } from "path";
import typescriptPlugin from "rollup-plugin-typescript2";
import jsonPlugin from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import del from 'rollup-plugin-delete';
import { camelCase } from 'change-case';
import { dependencies, devDependencies } from './package.json';

const deps = Object.keys(dependencies);

// utility library external dependencies.
const externals = [
    ...deps,
    ...Object.keys(devDependencies),
    'solid-js/web'
];

// utility library globals.
const globals = {};
deps.forEach(dep => {
    globals[dep] = camelCase(dep);
});
globals['solid-js/web'] = camelCase('solid-js/web');

const tsPluginOptions = {
    tsconfig: './tsconfig.json',
    check: true,
    clean: true,
    abortOnError: true,
    rollupCommonJSResolveHack: false,
    useTsconfigDeclarationDir: true,
};


/**
 * The configuration object.
 */

export default [
    // client library
    {
        input: resolve(__dirname, "lib/index.ts"),
        treeshake: false,
        preserveEntrySignatures: true,
        external: externals,
        output: [
            {
                format: "esm",
                file: resolve("dist/browser.js"),
                globals: globals,
            },
        ],
        plugins: [
            del({
                targets: ['./dist']
            }),
            nodeResolve({
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                ignoreGlobals: false,
                exportConditions: ["solid"],
                exclude: ['node_modules/**'],
            }),
            typescriptPlugin(tsPluginOptions),
            babel({
                extensions: [".js", '.jsx', ".ts", ".tsx"],
                babelHelpers: "bundled",
                presets: [["solid", { generate: "dom", hydratable: true }], "@babel/preset-typescript"],
            }),
            jsonPlugin(),
            terser({
                format: {
                    comments: false
                }
            })
        ],
        treeshake: false
    },

    // server library
    {
        input: resolve(__dirname, "lib/index.ts"),
        treeshake: false,
        preserveEntrySignatures: true,
        external: externals,
        output: [
            {
                format: "esm",
                file: resolve("dist/server.js"),
                globals: globals,
            },
        ],
        plugins: [
            nodeResolve({
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                ignoreGlobals: false,
                exclude: ['node_modules/**'],
                exportConditions: ["solid"]
            }),
            typescriptPlugin(tsPluginOptions),
            babel({
                extensions: [".js", '.jsx', ".ts", ".tsx"],
                babelHelpers: "bundled",
                presets: [["solid", { generate: "ssr", hydratable: true, async: true }], "@babel/preset-typescript"],
            }),
            jsonPlugin(),
            terser({
                format: {
                    comments: false
                }
            }),
        ],
        treeshake: false
    },
];