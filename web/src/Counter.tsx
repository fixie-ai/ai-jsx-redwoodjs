'use client'

import React from 'react'

// @ts-expect-error no types
import styles from './Counter.module.css'
import './Counter.css'

export const Counter = ({ action } : { action : () => Promise<string>}) => {
  const [count, setCount] = React.useState(0)
  const [result, setResult] = React.useState("");

  return (
    <div style={{ border: '3px blue dashed', margin: '1em', padding: '1em' }}>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={() => action().then(setResult)}>Server Action!</button>
      <h3 className={styles.header}>This is a client component.</h3>
      <h3>Server Action result is: {result}</h3>
    </div>
  )
}
