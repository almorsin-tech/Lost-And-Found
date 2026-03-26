from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, null
from db import Base

class Lost_Item_Entity(Base):
    __tablename__ = "lost_item"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    category = Column(String)
    campus = Column(String)
    image = Column(String)
    createDate = Column(DateTime, insert_default=datetime.now())
    reportType = Column(String, insert_default=null())
    reportDate = Column(DateTime)

class User_Entity(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)