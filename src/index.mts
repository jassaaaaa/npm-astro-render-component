// Author: Igor Dimitrijević (@igorskyflyer)

import type { AstroComponentFactory } from '@astro-render/factory.js'
import {
  experimental_AstroContainer as AstroContainer,
  type ContainerRenderOptions
} from 'astro/container'

/**
 * Renders an Astro component to a `DocumentFragment` in a DOM-like environment.
 *
 * This utility is primarily intended for testing or server-side rendering scenarios
 * where a simulated DOM (e.g., `jsdom`, `happy-dom`) is available. It instantiates
 * an `AstroContainer`, renders the component to an HTML string, and parses it into
 * a `DocumentFragment` for further inspection or manipulation.
 *
 * @param component - The Astro component to render.
 * @param options - Optional rendering configuration passed to the container (e.g., props, slots).
 * @returns A Promise that resolves to a `DocumentFragment` containing the rendered output.
 *
 * @throws Will throw if executed in a non-DOM environment (e.g., Node.js without `jsdom`).
 * @throws Will throw if the component fails to render.
 *
 * @example
 * ```ts
 * import { renderAstroComponent } from '@igor.dvlpr/astro-render-component'
 * import MyComponent from '../components/MyComponent.astro'
 *
 * const fragment = await renderAstroComponent(MyComponent, { props: { title: 'Hello' } })
 * expect(fragment.querySelector('h1')?.textContent).toBe('Hello')
 * ```
 */
export async function renderAstroComponent(
  component: AstroComponentFactory,
  options: ContainerRenderOptions = {}
): Promise<DocumentFragment> {
  if (typeof document === 'undefined') {
    throw new Error(
      'renderAstroComponent requires a DOM-like environment (e.g., happy-dom, jsdom)'
    )
  }

  try {
    const container: AstroContainer = await AstroContainer.create()
    const result: string = await container.renderToString(component, options)

    const template: HTMLTemplateElement = document.createElement('template')
    template.innerHTML = result

    return template.content
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Failed to render Astro component: ${err.message}`)
    }

    throw err
  }
}
