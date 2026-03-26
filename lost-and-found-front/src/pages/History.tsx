import { useEffect, useRef, useState } from "react";
import { getHistoryLostItems } from "../api/LostItems";
import SideNavigation from "../components/SideNavigation";
import type { Campus, Category, HistoryLostItem, ReportType } from "../types";
import HistoryItemCard from "../components/HistoryItemCard";
import HistoryNavigationBar from "../components/HistoryNavigationBar";


const History = () => {

  const [category, setCategory] = useState<Category>('');
  const [campus, setCampus] = useState<Campus>('');
  const [reportType, setReportType] = useState<ReportType>('');
  const [description, setDescription] = useState('');
  const [lostItems, setLostItems] = useState<Array<HistoryLostItem>>([]);
  const isSearching = useRef(false);


  useEffect(() => {
    if (isSearching.current) return;
    const searchItems = async () => {
      isSearching.current = true;
      const lostItems = await getHistoryLostItems(category, campus, description, reportType);
      setLostItems(lostItems);
      isSearching.current = false;
    }

    if (!isSearching.current) {
      searchItems();
    }


  }, [category, campus, description, reportType])

  return (
    <>
      <HistoryNavigationBar description={description} setDescription={setDescription} title={"History"}/>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <SideNavigation category={category} setCategory={setCategory} campus={campus} setCampus={setCampus} home={false} reportType={reportType} setReportType={setReportType}/>
          </div>
          <div className="col-1" />
          <div className="col-7 cards-container">
            <div className="row row-cols-2">
              {
                lostItems.map((lostItem) => (
                  <HistoryItemCard lostItem={lostItem} />
                ))
              }

            </div>

          </div>
          <div className="col-2" />
        </div>
      </div>
    </>
  );
};

export default History;