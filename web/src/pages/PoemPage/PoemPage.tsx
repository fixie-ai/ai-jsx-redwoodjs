import { useAIStream } from 'ai-jsx/react'

import { MetaTags } from '@redwoodjs/web'
import { useState } from 'react'

const PoemPage = () => {
  const [topic, setTopic] = useState("");
  const { current, fetchAI } = useAIStream();
  return (
    <>
      <MetaTags title="Poem" description="Poem page" />

      <h1>Generate a Poem</h1>
      <input type="text" value={topic} onChange={(e) => setTopic(e.currentTarget.value)} />
      <button onClick={() => fetchAI("/api/poem", { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify({ topic })})}>Generate!</button>
      <div style={{whiteSpace: 'pre-line'}}>
        {current}
      </div>
    </>
  )
}

export default PoemPage
