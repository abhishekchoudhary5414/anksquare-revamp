import Heading from '@/components/heading/heading'
import { getReadingTime, blogPosts } from '../../data/blog'
import BlogCarousel from './blog-carousel'
import type { BlogCardData } from './blog-carousel'
import styles from './blog.module.css'

interface BlogProps {
  isSlider?: boolean
}

const Blog = ({ isSlider = true }: BlogProps) => {
  const posts: BlogCardData[] = blogPosts.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    image: post.image,
    author: post.author,
    category: post.category,
    slug: post.slug,
    readTime: getReadingTime(post),
  }))

  return (
    <section className={styles.blogSection}>
      <div className={styles.container}>
        <Heading
          subtitle="Latest Updates"
          title="Insights From Our "
          titleHighlight=" Blog"
        />
        <BlogCarousel posts={isSlider ? posts.slice(0, 5) : posts} isSlider={isSlider} />
      </div>
    </section>
  )
}

export default Blog
