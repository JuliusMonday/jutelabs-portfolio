import { useState, useEffect } from 'react'

export default function useTypewriter(texts = [], speed = 80, pause = 1200) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [blink, setBlink] = useState(true)
  const [reverse, setReverse] = useState(false)

  useEffect(() => {
    if (!texts.length) return
    const current = texts[index]
    let timeout = null

    if (!reverse) {
      if (subIndex < current.length) {
        timeout = setTimeout(() => setSubIndex(s => s + 1), speed)
      } else {
        // pause at full text then start deleting
        timeout = setTimeout(() => setReverse(true), pause)
      }
    } else {
      if (subIndex > 0) {
        timeout = setTimeout(() => setSubIndex(s => s - 1), Math.max(40, speed / 1.6))
      } else {
        setReverse(false)
        setIndex(i => (i + 1) % texts.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [subIndex, index, reverse, texts, speed, pause])

  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 500)
    return () => clearInterval(id)
  }, [])

  return { text: texts[index]?.slice(0, subIndex) ?? '', blink }
}
