import { campusMap, categoriesMap, Category, ReportType, type LostItem } from "../types";
import TechnologyImg from "../assets/tech.jpg"
import ClothingImg from "../assets/clothing.jpeg"
import SchoolSupplies from "../assets/school_supplies.avif"
import BagImg from "../assets/bag.png"
import PersonalItems from "../assets/personal_items.webp"
import SportsEquipment from "../assets/sports_equipment.png"
import Other from "../assets/other.png"
import { useAuth } from "../AuthContext";
import { isAxiosError } from "axios";
import { reportItem } from "../api/LostItems";

type Props = {
    lostItem: LostItem,
    onUpdate: () => void
}

const ItemCard: React.FunctionComponent<Props> = ({ lostItem, onUpdate }) => {

    const { user } = useAuth();

    const CategoryImageMap = new Map();
    CategoryImageMap.set(Category.TECHNOLOGY, TechnologyImg);
    CategoryImageMap.set(Category.CLOTHING, ClothingImg);
    CategoryImageMap.set(Category.SCHOOL_SUPPLIES, SchoolSupplies);
    CategoryImageMap.set(Category.BAGS, BagImg);
    CategoryImageMap.set(Category.PERSONAL_ITEMS, PersonalItems);
    CategoryImageMap.set(Category.SPORTS_EQUIPMENT, SportsEquipment);
    CategoryImageMap.set(Category.OTHER, Other);

    const handleReportItem = async (itemId: number, reportType: ReportType) => {
        try {
            await reportItem(itemId, reportType);
            alert("Success!")
            onUpdate();
        } catch (error) {
            if (isAxiosError(error)) {
                alert(error.response?.data.detail);
            } else {
                alert(error);
            }
        }
    }


    return (
        <>
            <div className="col card-col">
                <div className="card">
                    <div className="card-content">
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
                                </div>
                            </div>
                        </div>
                    </div>

                    {user && <div className="card-footer text-start item-action-div">
                        <div>
                            <a onClick={() => handleReportItem(lostItem.id, ReportType.REPORTED_AS_CLAIMED)}>Report as claimed</a>
                        </div>
                        <div>
                            <a onClick={() => handleReportItem(lostItem.id, ReportType.DELETED)}>Delete Item</a>
                        </div>
                        <div>
                            <a onClick={() => handleReportItem(lostItem.id, ReportType.ARCHIVED)}>Archive</a>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )

}

export default ItemCard;