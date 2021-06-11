import NodePath from 'path'
import RollupTypescript from 'rollup-plugin-typescript2'
// import RollupCopy from 'rollup-plugin-copy'
import Package from './package.json'

const resolveFile = path => NodePath.resolve(__dirname, path)


export default {
  input: resolveFile(Package.source),
  output: [
    {
      file: resolveFile(Package.main),
      format: 'cjs',
      sourcemap: false
    },
  ],
  plugins: [,
    RollupTypescript({
      allowJs: true,
      tsconfig: resolveFile('tsconfig.json'),
      tsconfigOverride: { compilerOptions : { module: "es2015" } }
    }),
  ]
}
