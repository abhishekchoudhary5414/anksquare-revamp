import Image from 'next/image'
import { FiClock, FiUser, FiCalendar, FiLinkedin, FiTwitter, FiFacebook } from 'react-icons/fi'
import { getReadingTime } from '../../../data/blog'
import type { BlogPost } from '../../../data/blog'
import styles from './blogdetails.module.css'

interface BlogDetailProps {
  post: BlogPost
}

const BlogDetail = ({ post }: BlogDetailProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(`${dateString}T00:00:00`)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <article className={styles.blogDetail}>
      <div className={styles.container}>
        <div className={styles.featuredImage}>
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={600}
            priority
            className={styles.image}
          />
          <span className={styles.category}>{post.category}</span>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.header}>
              <h1 className={styles.title}>{post.title}</h1>

              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <FiUser className={styles.icon} />
                  <span>{post.author}</span>
                </div>
                <div className={styles.metaItem}>
                  <FiCalendar className={styles.icon} />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className={styles.metaItem}>
                  <FiClock className={styles.icon} />
                  <span>{getReadingTime(post)}</span>
                </div>
              </div>
            </div>

            <p className={styles.excerpt}>{post.excerpt}</p>
            <div className={styles.articleContent}>
              <p className={styles.sectionContent}>{post.content}</p>
              {post.sections?.map((section) => (
                <div key={section.subtitle} className={styles.section}>
                  <h2 className={styles.sectionTitle}>{section.subtitle}</h2>
                  <p className={styles.sectionContent}>{section.content}</p>
                </div>
              ))}
            </div>

            <div className={styles.share}>
              <span>Share this article:</span>
              <div className={styles.socialLinks}>
                <button aria-label="Share on LinkedIn">
                  <FiLinkedin />
                </button>
                <button aria-label="Share on Twitter">
                  <FiTwitter />
                </button>
                <button aria-label="Share on Facebook">
                  <FiFacebook />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogDetail
