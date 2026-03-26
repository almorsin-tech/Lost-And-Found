import { useEffect, useRef, useState } from "react";
import { getLostItems } from "../api/LostItems";
import HomeNavigationBar from "../components/HomeNavigationBar";
import ItemCard from "../components/ItemCard";
import SideNavigation from "../components/SideNavigation";
import type { Campus, Category, LostItem } from "../types";


const Home = () => {

  const [category, setCategory] = useState<Category>('');
  const [campus, setCampus] = useState<Campus>('');
  const [description, setDescription] = useState('');
  const [lostItems, setLostItems] = useState<Array<LostItem>>([]);
  const isSearching = useRef(false);

  const fetchLostItems = () => {
    if (isSearching.current) return;
    const searchItems = async () => {
      isSearching.current = true;
      const lostItems = await getLostItems(category, campus, description);
      setLostItems(lostItems);
      isSearching.current = false;
    }

    if (!isSearching.current) {
      searchItems();
    }

  }

  useEffect(() => {
    fetchLostItems();
  }, [category, campus, description])

  return (
    <>
      <HomeNavigationBar description={description} setDescription={setDescription} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <SideNavigation category={category} setCategory={setCategory} campus={campus} setCampus={setCampus} home={true}/>
          </div>
          <div className="col-1" />
          <div className="col-7 cards-container">
            <div className="row row-cols-2">
              {
                lostItems.map((lostItem) => (
                  <ItemCard 
                    lostItem={lostItem} 
                    onUpdate={fetchLostItems}
                    />
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

export default Home;