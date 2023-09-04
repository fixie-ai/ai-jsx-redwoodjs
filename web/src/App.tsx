/** @jsxImportSource ai-jsx/react */
import * as AI from "ai-jsx/experimental/next"
import { ChatCompletion, UserMessage } from "ai-jsx/core/completion"
import { Assets } from '@redwoodjs/vite/assets'
import { ProdRwRscServerGlobal } from '@redwoodjs/vite/rwRscGlobal'

// @ts-expect-error no types
import styles from './App.module.css'

import './App.css'

// TODO (RSC) Something like this will probably be needed
// const RwRscGlobal = import.meta.env.PROD ? ProdRwRscServerGlobal : DevRwRscServerGlobal;

globalThis.rwRscGlobal = new ProdRwRscServerGlobal()

const App = ({ name = 'Anonymous' }) => {
  return (
    <>
      {/* TODO (RSC) <Assets /> should be part of the router later */}
      <Assets />
      <div style={{ border: '3px red dashed', margin: '1em', padding: '1em' }}>
        <h1 className={styles.title}>Hello {name}!!</h1>
        <h3>This is a server component.</h3>
        <div style={{ whiteSpace: 'pre-line' }}>
          <AI.JSX>
            <ChatCompletion>
              <UserMessage>Tell me a story about Redwoods</UserMessage>
            </ChatCompletion>
          </AI.JSX>
        </div>
      </div>
    </>
  )
}

export default App
