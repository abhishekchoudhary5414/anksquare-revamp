'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation } from 'swiper/modules'
import { FiClock, FiUser } from 'react-icons/fi'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './blog.module.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Button from '@/components/button/Button'

export interface BlogCardData {
  id: number
  title: string
  excerpt: string
  image: string
  author: string
  category: string
  slug: string
  readTime: string
}

interface BlogCarouselProps {
  posts: BlogCardData[]
  isSlider: boolean
}

const BlogCard = ({ post }: { post: BlogCardData }) => (
  <div className={styles.blogCard}>
    <Link href={`/blog/${post.slug}`} className={styles.imageWrapper}>
      <Image
        src={post.image}
        alt={post.title}
        width={400}
        height={250}
        className={styles.image}
        loading="lazy"
      />
      <span className={styles.category}>{post.category}</span>
    </Link>
    <div className={styles.content}>
      <Link href={`/blog/${post.slug}`}>
        <h3 className={styles.title}>{post.title}</h3>
      </Link>
      <p className={styles.excerpt}>{post.excerpt}</p>
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <FiUser className={styles.icon} />
          <span>{post.author}</span>
        </div>
        <div className={styles.metaItem}>
          <FiClock className={styles.icon} />
          <span>{post.readTime}</span>
        </div>
      </div>
      <Button href={`/blog/${post.slug}`} variant="primary">
        Read More
        <FaChevronRight className={styles.arrow} />
      </Button>
    </div>
  </div>
)

const BlogCarousel = ({ posts, isSlider }: BlogCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null)

  if (!isSlider) {
    return (
      <div className={styles.blogGrid}>
        {posts.map(post => <BlogCard key={post.id} post={post} />)}
      </div>
    )
  }

  return (
    <div className={styles.sliderContainer}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        speed={0}
        onSwiper={swiper => {
          swiperRef.current = swiper
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 }
        }}
        className={styles.swiper}
      >
        {posts.map(post => (
          <SwiperSlide key={post.id}>
            <BlogCard post={post} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className={`${styles.navigationButton} ${styles.prevButton}`}
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous blog post"
      >
        <FaChevronLeft />
      </button>
      <button
        className={`${styles.navigationButton} ${styles.nextButton}`}
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next blog post"
      >
        <FaChevronRight />
      </button>
    </div>
  )
}

export default BlogCarousel
