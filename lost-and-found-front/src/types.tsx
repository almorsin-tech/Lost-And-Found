export const Category = {
    TECHNOLOGY: "TECHNOLOGY",
    CLOTHING: "CLOTHING",
    SCHOOL_SUPPLIES: "SCHOOL_SUPPLIES",
    BAGS: "BAGS",
    PERSONAL_ITEMS: "PERSONAL_ITEMS",
    SPORTS_EQUIPMENT: "SPORTS_EQUIPMENT",
    OTHER: "OTHER",
}

export type Category = typeof Category[keyof typeof Category];

export const Campus = {
    ELEMENTARY: "ELEMENTARY",
    MIDDLE_SCHOOL: "MIDDLE_SCHOOL",
    HIGH_SCHOOL: "HIGH_SCHOOL",
}

export type Campus = typeof Campus[keyof typeof Campus];


export const ReportType = {
    REPORTED_AS_CLAIMED: "REPORTED_AS_CLAIMED",
    DELETED: "DELETED",
    ARCHIVED: "ARCHIVED",
}

export type ReportType = typeof ReportType[keyof typeof ReportType];

export interface LostItem {
    id: number,
    category: Category,
    campus: Campus,
    description: string,
    image: string
}

export interface HistoryLostItem {
    id: number,
    category: Category,
    campus: Campus,
    description: string,
    reportType: ReportType,
    reportDate: string,
    image: string
}

export interface User {
  id: number,
  username: string
}

export interface UploadedFile {
  name: string
}

export const categoriesMap: Map<Category, string> = new Map([
  [Category.TECHNOLOGY, "Technology"],
  [Category.CLOTHING, "Clothing"],
  [Category.SCHOOL_SUPPLIES, "School Supplies"],
  [Category.BAGS, "Bags"],
  [Category.PERSONAL_ITEMS, "Personal Items"],
  [Category.SPORTS_EQUIPMENT, "Sports Equipment"],
  [Category.OTHER, "Other"],
])

export const campusMap: Map<Campus, string> = new Map([
  [Campus.ELEMENTARY, "Elementary"],
  [Campus.MIDDLE_SCHOOL, "Middle School"],
  [Campus.HIGH_SCHOOL, "High School"],
])

export const reportTypeMap: Map<ReportType, string> = new Map([
  [ReportType.REPORTED_AS_CLAIMED, "Reported as claimed"],
  [ReportType.DELETED, "Deleted/removed"],
  [ReportType.ARCHIVED, "Archived"],
])