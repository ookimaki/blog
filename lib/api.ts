import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({ auth: process.env.NOTION_API_SECRET });
const n2m = new NotionToMarkdown({ notionClient: notion });
const databaseId = process.env.NOTION_DATABASE_ID

const formatPage = (page: any) => {
  console.log(page.properties.Summary.rich_text)
  return {
    id: page.properties.ID.unique_id.number.toString(),
    title: page.properties.Name.title.map(item => item.plain_text).join(""),
    date: page.properties.Date.date.start,
    cover: page.cover.external.url,
    summary: page.properties.Summary.rich_text.map(item => item.plain_text).join(""),
  }
}

export async function getPostById(id: number) {
  const databaseQueryResponse =  await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "ID",
        number: {
          equals: Number(id)
        },
    },
  });
  const [page] = databaseQueryResponse.results as [any]
  const {title, date, cover, summary} = formatPage(page)
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);  
  return {
    id,
    title,
    date,
    cover,
    summary,
    content:mdString.parent,
  }
}

export async function getAllPosts() {
  const databaseQueryResponse =  await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'Tags',
          multi_select: {
            contains: 'Post',
          },
        },
        {
          property: 'Status',
          status: {
            equals: 'Done',
          },
        },
      ],
    },
  });
  return databaseQueryResponse.results.map((page: any) => {
    const {id, title, date, cover,summary} = formatPage(page)
    return {
      id,
      title,
      date,
      cover,
      summary,
    }
  });
}
