import datetime
from typing import Optional

from fastapi.responses import FileResponse
from entities import Lost_Item_Entity, User_Entity
from fastapi import FastAPI, Depends, Query, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from classes import Category, Campus, History_Lost_Item, Item_Report, Lost_Item, ReportType, User, UploadedFile
from sqlalchemy.orm import Session
from db import get_db, engine, SessionLocal
from contextlib import asynccontextmanager
from apscheduler.schedulers.background import BackgroundScheduler
import service
import uuid
import shutil
import os

Lost_Item_Entity.metadata.create_all(bind=engine)
User_Entity.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(
    app: FastAPI
    ):

    db: Session = SessionLocal()
    try:
        if not db.query(User_Entity).first():
            db.add(User_Entity(username="admin", password="admin"))
            db.commit()
    finally:
        db.close()

    scheduler = BackgroundScheduler()
    scheduler.add_job(service.delete_old_items, "interval", hours = 24)
    scheduler.start()

    yield
    

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ALLOWED_MIME_TYPES = {"image/jpeg", "image/png"}
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png"}

@app.get("/item/all", response_model=list[Lost_Item])
def getAllItems(
    category: Optional[Category] = Query(None), 
    campus: Optional[Campus] = Query(None), 
    description: Optional[str] = None,
    db: Session = Depends(get_db)
    ) -> list[Lost_Item]:
    return service.get_all(db=db, category=category, campus=campus, description=description)

@app.get("/item/history", response_model=list[History_Lost_Item])
def getHistoryItems(
    category: Optional[Category] = Query(None), 
    campus: Optional[Campus] = Query(None), 
    description: Optional[str] = None,
    reportType: Optional[ReportType] = Query(None),
    db: Session = Depends(get_db)
    ) -> list[History_Lost_Item]:
    return service.get_history(db=db, category=category, campus=campus, description=description, reportType=reportType)

@app.post("/item/save", response_model=Lost_Item)
def getAllItems(
    lost_item: Lost_Item,
    db: Session = Depends(get_db)
    ) -> Lost_Item:
    return service.save(db=db, lost_item=lost_item)

@app.patch("/item/report")
def reportItem(
    item_report: Item_Report,
    db: Session = Depends(get_db)
    ):
    return service.report_item(db=db, item_report=item_report)

@app.get("/user/login", response_model=User)
def login(
    username: Optional[str] = Query(None),
    password: Optional[str] = Query(None),
    db: Session = Depends(get_db)
    ) -> User:
    return service.login(db=db, username=username, password=password)

@app.post("/upload-file", response_model=UploadedFile)
def uploadFile(
    file: UploadFile = File(...)
    ) -> UploadedFile:
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(status_code=400, detail="Not allowed file")
    name, extension = os.path.splitext(file.filename)
    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Not allowed file extension")

    try:
        new_filename = f"{uuid.uuid4()}{extension}"
        with open(f"uploads/{new_filename}", "wb") as f:
            shutil.copyfileobj(file.file, f)
    except Exception:
        raise HTTPException(status_code=500, detail="Can not read file")
    finally:
        file.file.close()

    return UploadedFile(name=new_filename)

@app.get("/file")
def getFile(
    filename: str
    ) -> FileResponse:
    image_path = f"uploads/{filename}"
    return FileResponse(image_path, media_type="image/jpeg")