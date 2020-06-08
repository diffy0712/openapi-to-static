from typing import List, Optional
from bson import ObjectId
from slugify import slugify
from datetime import datetime

from ..models.article import (
    ArticleFilterParams,
    ArticleInCreate,
    ArticleInDB,
    ArticleInUpdate,
)
from ..db.mongodb import AsyncIOMotorClient
from ..core.config import database_name, article_collection_name
from .tag import (
    create_tags_that_not_exist,
    get_tags_for_article
)

async def get_article_by_slug(
    conn: AsyncIOMotorClient, slug: str
) -> ArticleInDB:
    article_doc = await conn[database_name][article_collection_name].find_one({"slug": slug})
    if article_doc:
        return ArticleInDB(
            **article_doc,
            created_at=ObjectId(article_doc["_id"]).generation_time
        )


async def create_article_by_slug(
    conn: AsyncIOMotorClient, article: ArticleInCreate
) -> ArticleInDB:
    slug = slugify(article.title)
    article_doc = article.dict()
    article_doc["slug"] = slug
    article_doc["updated_at"] = datetime.now()
    await conn[database_name][article_collection_name].insert_one(article_doc)

    if article.tag_list:
        await create_tags_that_not_exist(conn, article.tag_list)

    return ArticleInDB(
        **article_doc,
        created_at=ObjectId(article_doc["_id"]).generation_time,
    )


async def update_article_by_slug(
    conn: AsyncIOMotorClient, slug: str, article: ArticleInUpdate
) -> ArticleInDB:
    dbarticle = await get_article_by_slug(conn, slug)

    if article.title:
        dbarticle.slug = slugify(article.title)
        dbarticle.title = article.title
    dbarticle.body = article.body if article.body else dbarticle.body
    dbarticle.description = (
        article.description if article.description else dbarticle.description
    )
    if article.tag_list:
        await create_tags_that_not_exist(conn, article.tag_list)
        dbarticle.tag_list = article.tag_list

    dbarticle.updated_at = datetime.now()
    await conn[database_name][article_collection_name].replace_one({"slug": slug}, dbarticle.dict())

    dbarticle.created_at = ObjectId(dbarticle.id).generation_time
    return dbarticle


async def delete_article_by_slug(conn: AsyncIOMotorClient, slug: str):
    await conn[database_name][article_collection_name].delete_many({"slug": slug})


async def get_user_articles(
    conn: AsyncIOMotorClient, limit=20, offset=0
) -> List[ArticleInDB]:
    articles: List[ArticleInDB] = []
    article_docs = conn[database_name][article_collection_name].find({}, limit=limit, skip=offset)
    async for row in article_docs:
        slug = row["slug"]
        tags = await get_tags_for_article(conn, slug)
        articles.append(
            ArticleInDB(
                **row,
                created_at=ObjectId(row["_id"]).generation_time
            )
        )
    return articles


async def get_articles_with_filters(
    conn: AsyncIOMotorClient, filters: ArticleFilterParams
) -> List[ArticleInDB]:
    articles: List[ArticleInDB] = []
    base_query = {}

    if filters.tag:
        base_query["tag_list"] = f"$all: [\"{filters.tag}\"]"

    rows = conn[database_name][article_collection_name].find({},
                                                             limit=filters.limit,
                                                             skip=filters.offset)

    async for row in rows:
        slug = row["slug"]
        tags = await get_tags_for_article(conn, slug)
        articles.append(
            ArticleInDB(
                **row,
                created_at=ObjectId(row["_id"]).generation_time
            )
        )
    return articles
