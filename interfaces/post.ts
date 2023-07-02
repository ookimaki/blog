import type Author from './author'

type PostType = {
  id: string
  title: string
  date: string
  cover: string
  author: Author
  summary: string
  content: string
}

export default PostType
