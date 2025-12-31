import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import fs from 'fs';

const banner = fs.readFileSync('./banner.js', 'utf8');

export default {
  input: 'src/scripts/app.bootstrap.js',

  output: {
    file: 'public/dist/app.min.js',
    format: 'iife',
    name: 'JOLT_APP',
    banner,
    sourcemap: false
  },

  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    resolve({
      browser: true,
      preferBuiltins: false
    }),

    commonjs(),

    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3
      },
      mangle: {
        properties: {
          regex: /^_/
        }
      },
      format: {
        comments: false
      }
    })
  ]
};
