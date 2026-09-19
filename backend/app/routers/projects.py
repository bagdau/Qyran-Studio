import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.database import get_session
from app.models import Project, Scene
from app.schemas import ProjectCreate, ProjectRead, ProjectUpdate, SceneCreate, SceneRead

router = APIRouter(prefix="/projects", tags=["projects"])


async def get_project_or_404(project_id: uuid.UUID, session: AsyncSession) -> Project:
    result = await session.execute(
        select(Project).options(selectinload(Project.scenes)).where(Project.id == project_id)
    )
    project = result.scalar_one_or_none()
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project


@router.get("", response_model=list[ProjectRead])
async def list_projects(session: AsyncSession = Depends(get_session)) -> list[Project]:
    result = await session.execute(select(Project).options(selectinload(Project.scenes)).order_by(Project.updated_at.desc()))
    return list(result.scalars().unique())


@router.post("", response_model=ProjectRead, status_code=status.HTTP_201_CREATED)
async def create_project(payload: ProjectCreate, session: AsyncSession = Depends(get_session)) -> Project:
    project = Project(**payload.model_dump())
    session.add(project)
    try:
        await session.commit()
    except IntegrityError as error:
        await session.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Project title already exists") from error
    return await get_project_or_404(project.id, session)


@router.get("/{project_id}", response_model=ProjectRead)
async def get_project(project_id: uuid.UUID, session: AsyncSession = Depends(get_session)) -> Project:
    return await get_project_or_404(project_id, session)


@router.patch("/{project_id}", response_model=ProjectRead)
async def update_project(project_id: uuid.UUID, payload: ProjectUpdate, session: AsyncSession = Depends(get_session)) -> Project:
    project = await get_project_or_404(project_id, session)
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(project, field, value)
    try:
        await session.commit()
    except IntegrityError as error:
        await session.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Project title already exists") from error
    return await get_project_or_404(project_id, session)


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(project_id: uuid.UUID, session: AsyncSession = Depends(get_session)) -> None:
    project = await get_project_or_404(project_id, session)
    await session.delete(project)
    await session.commit()


@router.post("/{project_id}/scenes", response_model=SceneRead, status_code=status.HTTP_201_CREATED)
async def create_scene(project_id: uuid.UUID, payload: SceneCreate, session: AsyncSession = Depends(get_session)) -> Scene:
    await get_project_or_404(project_id, session)
    scene = Scene(project_id=project_id, **payload.model_dump())
    session.add(scene)
    await session.commit()
    await session.refresh(scene)
    return scene
