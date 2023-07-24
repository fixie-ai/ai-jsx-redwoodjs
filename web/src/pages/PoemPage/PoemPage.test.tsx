import { render } from '@redwoodjs/testing/web'

import PoemPage from './PoemPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PoemPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PoemPage />)
    }).not.toThrow()
  })
})
