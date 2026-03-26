from datetime import datetime
from typing import Optional
from pydantic import BaseModel, field_serializer
from enum import Enum

class Category(str, Enum):
    TECHNOLOGY = "TECHNOLOGY"
    CLOTHING = "CLOTHING"
    SCHOOL_SUPPLIES = "SCHOOL_SUPPLIES"
    BAGS = "BAGS"
    PERSONAL_ITEMS = "PERSONAL_ITEMS"
    SPORTS_EQUIPMENT = "SPORTS_EQUIPMENT"
    OTHER = "OTHER"

class Campus(str, Enum):
    ELEMENTARY = "ELEMENTARY"
    MIDDLE_SCHOOL = "MIDDLE_SCHOOL"
    HIGH_SCHOOL = "HIGH_SCHOOL"

class ReportType(str, Enum):
    REPORTED_AS_CLAIMED = "REPORTED_AS_CLAIMED"
    DELETED = "DELETED"
    ARCHIVED = "ARCHIVED"

class Lost_Item(BaseModel):
    id: Optional[int] = None
    description: Optional[str] = None
    category: Optional[Category] = None
    campus: Optional[Campus] = None
    image: Optional[str] = None

class Item_Report(BaseModel):
    id: Optional[int] = None
    reportType: Optional[ReportType] = None

class History_Lost_Item(BaseModel):
    id: Optional[int] = None
    description: Optional[str] = None
    category: Optional[Category] = None
    campus: Optional[Campus] = None
    image: Optional[str] = None
    reportType: Optional[ReportType] = None
    reportDate: Optional[datetime]
    
    @field_serializer('reportDate')
    def serialize_dt(self, dt: datetime, _info):
        return dt.strftime('%Y-%m-%d %H:%M')

class User(BaseModel):
    id: Optional[int] = None
    username: Optional[str] = None

class UploadedFile(BaseModel):
    name: Optional[str] = None