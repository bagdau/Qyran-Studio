import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models import ProjectStatus


class SceneCreate(BaseModel):
    title: str = Field(min_length=1, max_length=160)
    description: str | None = None
    position: int = Field(default=0, ge=0)
    panel_count: int = Field(default=1, ge=1, le=100)


class SceneRead(SceneCreate):
    id: uuid.UUID
    project_id: uuid.UUID
    model_config = ConfigDict(from_attributes=True)


class ProjectCreate(BaseModel):
    title: str = Field(min_length=1, max_length=160)
    synopsis: str | None = None
    source_text: str | None = None
    visual_style: str = Field(default="epic_graphic", max_length=80)
    layout: str = Field(default="classic_page", max_length=80)
    status: ProjectStatus = ProjectStatus.draft


class ProjectUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=160)
    synopsis: str | None = None
    source_text: str | None = None
    visual_style: str | None = Field(default=None, max_length=80)
    layout: str | None = Field(default=None, max_length=80)
    status: ProjectStatus | None = None


class ProjectRead(ProjectCreate):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    scenes: list[SceneRead] = Field(default_factory=list)
    model_config = ConfigDict(from_attributes=True)


class AssetCreate(BaseModel):
    title: str = Field(min_length=1, max_length=160)
    asset_type: str = Field(default="image", max_length=50)
    url: str = Field(min_length=1, max_length=500)
    prompt: str | None = None


class AssetRead(AssetCreate):
    id: uuid.UUID
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
