from fastapi import APIRouter

from .endpoints.article import router as article_router
from .endpoints.tag import router as tag_router

router = APIRouter()
router.include_router(article_router)
router.include_router(tag_router)
