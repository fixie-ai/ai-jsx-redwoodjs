import type { ComponentMeta } from '@storybook/react'

import PoemPage from './PoemPage'

export const generated = () => {
  return <PoemPage />
}

export default {
  title: 'Pages/PoemPage',
  component: PoemPage,
} as ComponentMeta<typeof PoemPage>
