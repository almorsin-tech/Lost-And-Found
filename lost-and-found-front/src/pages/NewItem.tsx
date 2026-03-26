import { useRef, useState, type ChangeEvent } from "react";
import { saveItem, uploadFile } from "../api/LostItems";
import { Campus, campusMap, categoriesMap, Category, type UploadedFile, type User } from "../types";
import { useNavigate } from "react-router-dom";
import TechnologyImg from "../assets/tech.jpg"
import ClothingImg from "../assets/clothing.jpeg"
import SchoolSupplies from "../assets/school_supplies.avif"
import BagImg from "../assets/bag.png"
import PersonalItems from "../assets/personal_items.webp"
import SportsEquipment from "../assets/sports_equipment.png"
import Other from "../assets/other.png"
import CameraCapture from "../components/CameraCapture";
import { AxiosError, isAxiosError } from "axios";

const NewItem = () => {

  const navigate = useNavigate();

  const [category, setCategory] = useState<Category>('');
  const [campus, setCampus] = useState<Campus>('');
  const [description, setDescription] = useState<Campus>('');
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const CategoryImageMap = new Map();
  CategoryImageMap.set(Category.TECHNOLOGY, TechnologyImg);
  CategoryImageMap.set(Category.CLOTHING, ClothingImg);
  CategoryImageMap.set(Category.SCHOOL_SUPPLIES, SchoolSupplies);
  CategoryImageMap.set(Category.BAGS, BagImg);
  CategoryImageMap.set(Category.PERSONAL_ITEMS, PersonalItems);
  CategoryImageMap.set(Category.SPORTS_EQUIPMENT, SportsEquipment);
  CategoryImageMap.set(Category.OTHER, Other);

  const submitItem = async () => {

    if (category === undefined || category.trim() === '') {
      alert("Select category");
      return;
    }

    if (campus === undefined || campus.trim() === '') {
      alert("Select campus");
      return;
    }

    if (description === undefined || description.trim() === '') {
      alert("Write a description");
      return;
    }

    if (description.trim().split(" ").length >= 30) {
      alert("Description is more than 30 words");
      return;
    }

    if (!image) {
      alert("Upload an image of the item");
      return;
    }

    var uploadedFile: UploadedFile;
    try {
      if (imageFile) {
        uploadedFile = await uploadFile(imageFile);
      } else {
        alert("File is not uploaded, try again");
        return;
      }
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.detail);
      } else {
        alert(error);
      }
      return;
    }

    try {
      const response = await saveItem(category, campus, description.trim(), uploadedFile.name);
      if (response) {
        alert("Success!");
        window.location.reload();
      } else {
        alert("Error");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.detail);
      } else {
        alert(error);
      }
    }

  }

  const base64ToFile = (img: string, filename: string = "file.jpg"): File => {
    const [header, data] = img.split(',');
    const mimeMatch = header.match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const bstr = atob(data);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const toImageFile = () => {
    if (image) {
      const file = base64ToFile(image);
      setImageFile(file);
    }
  }

  const closeCamera = () => {
    setCameraActive(false);
    setImage(null);
    setImageFile(null);
  }

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  }
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="take-back-button">
        <button className="btn btn-primary" onClick={() => navigate("/")}>Take me back</button>
      </div>
      <div className="page-title container-fluid text-center">
        <h2 style={{ display: "inline", borderBottom: "1px #000 solid" }}>
          Item Submission Page
        </h2>
      </div>
      <div className="container-fluid page-title text-center">
        <h3>
          Upload photo/file
        </h3>
        <div className="row row-cols-2 justify-content-md-center">
          <div className="col-3">
            <button type="button" className="btn btn-photo" data-bs-toggle="modal" data-bs-target="#cameraModal" onClick={() => setCameraActive(true)}>
              <div className="card text-center align-items-center upload-photo" style={{ padding: "20px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                </svg>
                Camera
              </div>
            </button>
          </div>
          <div className="col-3">
            <button type="button" className="btn btn-photo" onClick={handleFileUploadClick}>
              <div className="card text-center align-items-center upload-photo" style={{ padding: "20px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" fill="currentColor" className="bi bi-file-earmark-image" viewBox="0 0 16 16">
                  <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                  <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1z" />
                </svg>
                Upload File
                <input type="file" hidden={true} onChange={handleFileChange} ref={fileInputRef} accept="image/jpg, image/jpeg, image/png, .jpg, .jpeg, .png"/>
              </div>
            </button>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center mt-2">
          {image && <>
            <h5>Uploaded image:</h5>
            <img width={200} src={image} />
          </>}
        </div>
      </div>
      <div className="container-fluid">
        <div className="text-start">
          <div className="form-element-title">
            Select an Item Category
          </div>
        </div>
        <div className="row row-cols-4">

          {Object.values(Category).map((cat) => (
            <div className="col category-card card no-border">
              <div className="card-title">
                {categoriesMap.get(cat)}
                <input type="checkbox" value={cat}
                  onClick={(e) => {
                    if (category === e.currentTarget.value) {
                      setCategory('');
                    } else {
                      setCategory(e.currentTarget.value);
                    }
                  }}
                  checked={category === cat} />
              </div>
              <div className="category-card-body card-body">
                <img width={'150px'} src={CategoryImageMap.get(cat)} />
              </div>
            </div>
          ))}

        </div>

        <div className="text-start">
          <div className="form-element-title">
            Select the Location
          </div>
        </div>
        <div className="row row-cols-4">

          {Object.values(Campus).map((camp) => (
            <div className="col category-card card no-border">
              <div className="card-title">
                {campusMap.get(camp)}
                <input type="checkbox" value={camp}
                  onClick={(e) => {
                    if (campus === e.currentTarget.value) {
                      setCampus('');
                    } else {
                      setCampus(e.currentTarget.value);
                    }
                  }}
                  checked={campus === camp} />
              </div>
            </div>
          ))}

        </div>

        <div className="text-start">
          <div className="form-element-title">
            Add a little description (MAX. 30 words)
          </div>
        </div>
        <div className="row text-start">
          <div className="col">
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} cols={60} />
          </div>
          <div className="col">
            <button className="btn btn-primary" onClick={submitItem}> Submit an Item </button>
          </div>

        </div>
      </div>

      <div className="modal fade" id="cameraModal" tabIndex={-1} aria-labelledby="cameraModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="cameraModalLabel">Camera</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {cameraActive && <CameraCapture image={image} setImage={setImage} />}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeCamera}>Clear & close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={toImageFile}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewItem;