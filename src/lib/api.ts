import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

import Post from "@/interfaces/post";

const notion = new Client({ auth: process.env.NOTION_API_SECRET });
const databaseId = process.env.NOTION_DATABASE_ID;
const n2m = new NotionToMarkdown({ notionClient: notion });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const format = (page: any): Post => {
  return {
    id: page.id,
    title: page.properties.Name[page.properties.Name.type].map((item) => item.plain_text).join(""),
    date: page.properties.Date[page.properties.Date.type].start,
    slug:
      page.properties.URL[page.properties.URL.type] || page.properties.ID[page.properties.ID.type].number.toString(),
    cover: page.cover[page.cover.type].url,
    icon: page.icon[page.icon.type],
    summary: page.properties.Summary[page.properties.Summary.type].map((item) => item.plain_text).join(""),
  };
};

export const getPostContent = async (postId: string) => {
  const mdblocks = await n2m.pageToMarkdown(postId);
  const mdString = n2m.toMarkdownString(mdblocks);
  return mdString.parent;
};

export const getAllPosts = async () => {
  const databaseQueryResponse = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Tags",
          multi_select: {
            contains: "Post",
          },
        },
        {
          property: "Status",
          status: {
            equals: "Done",
          },
        },
      ],
    },
  });
  return databaseQueryResponse.results.map((page) => {
    return {
      ...format(page),
    };
  });
};
