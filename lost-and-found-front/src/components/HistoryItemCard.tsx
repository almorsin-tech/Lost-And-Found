import { campusMap, categoriesMap, Category, reportTypeMap, type HistoryLostItem, type LostItem } from "../types";
import TechnologyImg from "../assets/tech.jpg"
import ClothingImg from "../assets/clothing.jpeg"
import SchoolSupplies from "../assets/school_supplies.avif"
import BagImg from "../assets/bag.png"
import PersonalItems from "../assets/personal_items.webp"
import SportsEquipment from "../assets/sports_equipment.png"
import Other from "../assets/other.png"

type Props = {
    lostItem: HistoryLostItem
}

const HistoryItemCard: React.FunctionComponent<Props> = ({ lostItem }) => {

    const CategoryImageMap = new Map();
    CategoryImageMap.set(Category.TECHNOLOGY, TechnologyImg);
    CategoryImageMap.set(Category.CLOTHING, ClothingImg);
    CategoryImageMap.set(Category.SCHOOL_SUPPLIES, SchoolSupplies);
    CategoryImageMap.set(Category.BAGS, BagImg);
    CategoryImageMap.set(Category.PERSONAL_ITEMS, PersonalItems);
    CategoryImageMap.set(Category.SPORTS_EQUIPMENT, SportsEquipment);
    CategoryImageMap.set(Category.OTHER, Other);


    return (
        <>
            <div className="col card-col">
                <div className="card">
                    <div className="row g-0">
                        <div className="col">
                            <img width={'150px'} src={`http://localhost:8000/file?filename=${lostItem.image}`} className="img rounded-start" alt="..." />
                        </div>
                        <div className="col">
                            <div className="card-body">
                                <p className="card-text">
                                    <small>
                                        Description: {lostItem.description}
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="card-body">
                                <div>
                                    Item category: {categoriesMap.get(lostItem.category)}
                                </div>
                                <div>
                                    Location: {campusMap.get(lostItem.campus)}
                                </div>
                                <div>
                                    Report type: {reportTypeMap.get(lostItem.reportType)}
                                </div>
                                <div>
                                    Date of report: {lostItem.reportDate}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default HistoryItemCard;