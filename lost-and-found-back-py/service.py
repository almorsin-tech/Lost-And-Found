from datetime import datetime, timedelta
from typing import Optional

from sqlalchemy import null
from classes import Campus, Category, History_Lost_Item, Item_Report, Lost_Item, ReportType, User
from db import SessionLocal
from entities import Lost_Item_Entity, User_Entity
from sqlalchemy.orm import Session
from fastapi import HTTPException

def get_all(
        db: Session,
        category: Optional[Category] = None, 
        campus: Optional[Campus] = None, 
        description: Optional[str] = None
        ) -> list[Lost_Item]:
    
    query = db.query(Lost_Item_Entity)
    
    if category != None and category != '':
        query = query.filter(Lost_Item_Entity.category == category)
    
    if campus != None and campus != '':
        query = query.filter(Lost_Item_Entity.campus == campus)
    
    if description != None and description != '':
        query = query.filter(Lost_Item_Entity.description.contains(description))

    query = query.filter(Lost_Item_Entity.reportType == null())

    lost_items = query.all()
    
    return [
        Lost_Item(
            id = lost_item.id,
            category = lost_item.category,
            campus = lost_item.campus,
            description = lost_item.description,
            image = lost_item.image
        )
        for lost_item in lost_items
    ]

def get_history(
        db: Session,
        category: Optional[Category] = None, 
        campus: Optional[Campus] = None, 
        description: Optional[str] = None,
        reportType: Optional[ReportType] = None
        ) -> list[History_Lost_Item]:
    
    query = db.query(Lost_Item_Entity)
    
    if category != None and category != '':
        query = query.filter(Lost_Item_Entity.category == category)
    
    if campus != None and campus != '':
        query = query.filter(Lost_Item_Entity.campus == campus)
    
    if description != None and description != '':
        query = query.filter(Lost_Item_Entity.description.contains(description))
    
    if reportType != None and reportType != '':
        query = query.filter(Lost_Item_Entity.reportType.contains(reportType))

    if reportType == None or reportType != '':
        query = query.filter(Lost_Item_Entity.reportType != null())

    lost_items = query.all()
    
    return [
        History_Lost_Item(
            id = lost_item.id,
            category = lost_item.category,
            campus = lost_item.campus,
            description = lost_item.description,
            image = lost_item.image,
            reportType = lost_item.reportType,
            reportDate = lost_item.reportDate
        )
        for lost_item in lost_items
    ]

def save(
        db: Session,
        lost_item: Lost_Item
        ) -> Lost_Item:
    lost_item_entity = Lost_Item_Entity(category=lost_item.category, campus=lost_item.campus, description=lost_item.description, image = lost_item.image)
    db.add(lost_item_entity)
    db.commit()
    db.refresh(lost_item_entity)
    return lost_item_entity

def report_item(
        db: Session,
        item_report: Item_Report
        ):
    if item_report.id == None or item_report.reportType == None:
        raise HTTPException(status_code=400, detail="Item ID and/or report type are invalid")
    
    lost_item_entity = db.query(Lost_Item_Entity).filter(Lost_Item_Entity.id == item_report.id).first()
    lost_item_entity.reportType = item_report.reportType
    lost_item_entity.reportDate = datetime.now()
    db.commit()
    return lost_item_entity

def login(
        db: Session,
        username: Optional[str] = None,
        password: Optional[str] = None
        ) -> User:
    if username == None or password == None:
        raise HTTPException(status_code=400, detail="Username and/or password are invalid")
    query = db.query(User_Entity)
    query = query.filter(User_Entity.username == username)
    query = query.filter(User_Entity.password == password)
    user_entity = query.first()

    if user_entity == None:
        raise HTTPException(status_code=400, detail="Username and/or password are incorrect")
    
    return User(id=user_entity.id, username=user_entity.username)

def delete_old_items():
    db = SessionLocal()
    try:
        threshold_date = datetime.now() - timedelta(days=30)
        query = db.query(Lost_Item_Entity).filter(Lost_Item_Entity.reportType == null()).filter(Lost_Item_Entity.createDate <= threshold_date)
        lostItems = query.all()
        print(threshold_date)
        print(lostItems)
        for lostItem in lostItems:
            lostItem.reportType = ReportType.DELETED
            lostItem.reportDate = datetime.now()
        db.commit()
    finally:
        db.close()


    