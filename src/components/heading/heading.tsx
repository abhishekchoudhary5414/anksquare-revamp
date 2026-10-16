'use client'

import styles from './heading.module.css'

interface HeadingProps {
  subtitle: string
  title: string
  titleHighlight: string
  id?: string
  theme?: 'default' | 'light'
  level?: 1 | 2
}

const Heading = ({ subtitle, title, titleHighlight, id, theme = 'default', level = 2 }: HeadingProps) => {
    const TitleTag = level === 1 ? 'h1' : 'h2'

    return (
        <>
            <div
                className={`${styles.heading} ${theme === 'light' ? styles.light : ''}`}
            >
                <span
                    className={styles.subtitle}
                >
                    {subtitle}
                </span>
                <TitleTag
                    id={id}
                    className={styles.title}
                >
                    {title}
                    <span
                        className={styles.highlight}
                    >
                        {titleHighlight}
                    </span>
                </TitleTag>
            </div>
        </>
    )
}

export default Heading