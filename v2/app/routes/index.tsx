import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { ArticleModal } from '../components/ArticleModal'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import type { ArticleId } from '../lib/types'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [article, setArticle] = useState<ArticleId | null>(null)
  const [isActive, setIsActive] = useState(false)

  const openArticle = useCallback((id: ArticleId) => {
    setArticle(id)
    setIsActive(true)
  }, [])

  const closeArticle = useCallback(() => {
    setIsActive(false)
    // Wait for CSS transition before unmounting content
    setTimeout(() => setArticle(null), 350)
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isActive) closeArticle()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isActive, closeArticle])

  return (
    <div id="wrapper" className={isActive ? 'article-active' : ''}>
      <Header onOpenArticle={openArticle} />
      <ArticleModal
        article={article}
        isActive={isActive}
        onClose={closeArticle}
      />
      <Footer />
    </div>
  )
}
