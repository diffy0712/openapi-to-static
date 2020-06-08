from typing import Optional

from pydantic import EmailStr
from starlette.exceptions import HTTPException
from starlette.status import (
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
    HTTP_422_UNPROCESSABLE_ENTITY,
)

from .article import get_article_by_slug
from ..db.mongodb import AsyncIOMotorClient
from ..models.article import ArticleInDB

async def get_article_or_404(
        conn: AsyncIOMotorClient, slug: str
) -> ArticleInDB:
    searched_article = await get_article_by_slug(conn, slug)
    if not searched_article:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail=f"Article with slug '{slug}' not found",
        )
    return searched_article


async def check_article_for_existence_and_modifying_permissions(
        conn: AsyncIOMotorClient, slug: str
):
    searched_article = await get_article_by_slug(conn, slug)
    if not searched_article:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail=f"Article with slug '{slug}' not found",
        )