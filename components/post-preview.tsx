// import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../interfaces/author'

type Props = {
  title: string
  cover: string
  date: string
  summary: string
  author: Author
  id: string
}

const PostPreview = ({
  title,
  cover,
  date,
  summary,
  author,
  id,
}: Props) => {
  return (
    <div>
      <div className="mb-5">
        <CoverImage id={id} title={title} src={cover} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/posts/${id}`}
          href="/posts/[id]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{summary}</p>
      {/* <Avatar name={author.name} picture={author.picture} /> */}
    </div>
  )
}

export default PostPreview
