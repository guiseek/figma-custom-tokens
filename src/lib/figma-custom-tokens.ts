import { context, Context } from './config/context'
import { writeTokens } from './write-tokens'
import { makeRequest } from './make-request'
import { options } from './config/options'
import { Listr } from 'listr2'
import {
  getBreakpoints,
  getTypography,
  getSpacing,
  getShadows,
  getRadius,
  getColors,
} from './utils/tokens'

/**
 * @name Figma Custom Tokens
 *
 * @export
 * @param {string} file
 * @param {string} token
 */
export default async function (file: string, token: string) {
  const tasks = new Listr<Context>(
    [
      {
        title: 'Buscando dados (API Figma)',
        task: async (ctx): Promise<void> => {
          ctx.response = await makeRequest(file, token)
        },
      },
      {
        title: 'Tratando resposta',
        task: async (ctx, task): Promise<void> => {
          const { document } = ctx.response
          ctx.nodes = document.children.shift().children
        },
      },
      {
        title: 'Criação de tokens',
        task: (ctx, task): Listr =>
          task.newListr(
            [
              {
                title: 'Cores',
                task: (ctx, task) => {
                  const values = getColors('Colors', ctx.nodes)
                  writeTokens('color', values, ctx.dist)
                },
              },
              {
                title: 'Espaçamentos',
                task: () => {
                  const values = getSpacing('Spacings', ctx.nodes)
                  writeTokens('spacing', values, ctx.dist)
                },
              },
              {
                title: 'Tipografia',
                task: () => {
                  const values = getTypography('Typography', ctx.nodes)
                  writeTokens('typography', values, ctx.dist)
                },
              },
              {
                title: 'Sombras',
                task: () => {
                  const values = getShadows('Shadows', ctx.nodes)
                  writeTokens('shadow', values, ctx.dist)
                },
              },
              {
                title: 'Bordas',
                task: () => {
                  const values = getRadius('Radius', ctx.nodes)
                  writeTokens('radius', values, ctx.dist)
                },
              },
              {
                title: 'Grid',
                task: () => {
                  const values = getBreakpoints('Breakpoints', ctx.nodes)
                  writeTokens('breakpoint', values, ctx.dist)
                },
              },
            ],
            options
          ),
      },
    ],
    options
  )

  try {
    await tasks.run(context)
  } catch (e) {
    // it will collect all the errors encountered if { exitOnError: false } is set as an option but will not throw them
    // elsewise it will throw the first error encountered as expected
    console.error(e)
  }
}
