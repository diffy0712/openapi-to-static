from typing import Optional

from fastapi import APIRouter, Body, Depends, Path, Query
from slugify import slugify
from starlette.exceptions import HTTPException
from starlette.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_422_UNPROCESSABLE_ENTITY,
)

from ....core.utils import create_aliased_response
from ....crud.article import (
    create_article_by_slug,
    delete_article_by_slug,
    get_article_by_slug,
    get_articles_with_filters,
    update_article_by_slug,
)
from ....crud.shortcuts import (
    check_article_for_existence_and_modifying_permissions,
    get_article_or_404,
)
from ....db.mongodb import AsyncIOMotorClient, get_database
from ....models.article import (
    ArticleFilterParams,
    ArticleInCreate,
    ArticleInResponse,
    ArticleInUpdate,
    ManyArticlesInResponse,
)

router = APIRouter()


@router.get("/articles", response_model=ManyArticlesInResponse, tags=["articles"])
async def get_articles(
        tag: str = "",
        limit: int = Query(20, gt=0),
        offset: int = Query(0, ge=0),
        db: AsyncIOMotorClient = Depends(get_database),
):
    filters = ArticleFilterParams(
        tag=tag, limit=limit, offset=offset
    )
    dbarticles = await get_articles_with_filters(
        db, filters
    )
    return create_aliased_response(
        ManyArticlesInResponse(articles=dbarticles, articles_count=len(dbarticles))
    )


@router.get("/articles/{slug}", response_model=ArticleInResponse, tags=["articles"])
async def get_article(
        slug: str = Path(..., min_length=1),
        db: AsyncIOMotorClient = Depends(get_database),
):
    dbarticle = await get_article_by_slug(
        db, slug
    )
    if not dbarticle:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail=f"Article with slug '{slug}' not found",
        )

    return create_aliased_response(ArticleInResponse(article=dbarticle))


@router.post(
    "/articles",
    response_model=ArticleInResponse,
    tags=["articles"],
    status_code=HTTP_201_CREATED,
)
async def create_new_article(
        article: ArticleInCreate = Body(...),
        db: AsyncIOMotorClient = Depends(get_database),
):
    article_by_slug = await get_article_by_slug(
        db, slugify(article.title)
    )
    if article_by_slug:
        raise HTTPException(
            status_code=HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Existing article with slug='{article_by_slug.slug}'",
        )

    dbarticle = await create_article_by_slug(db, article)
    return create_aliased_response(ArticleInResponse(article=dbarticle))


@router.put("/articles/{slug}", response_model=ArticleInResponse, tags=["articles"])
async def update_article(
        slug: str = Path(..., min_length=1),
        article: ArticleInUpdate = Body(...),
        db: AsyncIOMotorClient = Depends(get_database),
):
    await check_article_for_existence_and_modifying_permissions(
        db, slugify
    )

    dbarticle = await update_article_by_slug(db, slug, article)
    return create_aliased_response(ArticleInResponse(article=dbarticle))


@router.delete("/articles/{slug}", tags=["articles"], status_code=HTTP_204_NO_CONTENT)
async def delete_article(
        slug: str = Path(..., min_length=1),
        db: AsyncIOMotorClient = Depends(get_database),
):
    await check_article_for_existence_and_modifying_permissions(
        db, slug
    )

    await delete_article_by_slug(db, slug)