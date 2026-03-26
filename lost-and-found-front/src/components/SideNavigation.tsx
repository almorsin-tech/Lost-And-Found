import { useNavigate } from "react-router-dom";
import { Campus, campusMap, categoriesMap, Category, ReportType, reportTypeMap, type User } from "../types";
import { useAuth } from "../AuthContext";

type Props = {
  category: Category,
  setCategory: React.Dispatch<React.SetStateAction<Category>>,
  campus: Campus,
  setCampus: React.Dispatch<React.SetStateAction<Campus>>,
  home: boolean,
  reportType?: ReportType,
  setReportType?: React.Dispatch<React.SetStateAction<ReportType>>
}

const SideNavigation: React.FunctionComponent<Props> = ({ category, setCategory, campus, setCampus, home, reportType = undefined, setReportType = undefined }) => {

  const { user } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      <div className="sidenavs">
        <div className="sidenav">
          {user && <div style={{ marginBottom: "10px" }}>
            {home && <button className="btn btn-primary" onClick={() => navigate("/history")}>View history</button>}
          </div>}
          <div className="sidenav-title">
            Filter by Category
          </div>
          <div className="sidenav-content">

            {
              Object.values(Category).map((cat) => (
                <div className="sidenav-content-element">
                  <label>{categoriesMap.get(cat)}</label>
                  <input value={cat} onClick={(e) => {
                    if (category === e.currentTarget.value) {
                      setCategory('');
                    } else {
                      setCategory(e.currentTarget.value);
                    }
                  }} checked={category === cat} type="checkbox" />
                </div>
              ))
            }

          </div>
        </div>

        <div className="sidenav">
          <div className="sidenav-title">
            Filter by Campus
          </div>
          <div className="sidenav-content">

            {
              Object.values(Campus).map((camp) => (
                <div className="sidenav-content-element">
                  <label>{campusMap.get(camp)}</label>
                  <input value={camp} onClick={(e) => {
                    if (campus === e.currentTarget.value) {
                      setCampus('');
                    } else {
                      setCampus(e.currentTarget.value);
                    }
                  }} checked={campus === camp} type="checkbox" />
                </div>
              ))
            }

          </div>
        </div>

        {!home && <div className="sidenav">
          <div className="sidenav-title">
            Report type
          </div>
          <div className="sidenav-content">

            {
              Object.values(ReportType).map((repType) => (
                <div className="sidenav-content-element">
                  <label>{reportTypeMap.get(repType)}</label>
                  <input value={repType} onClick={(e) => {
                    if (reportType === e.currentTarget.value) {
                      setReportType && setReportType('');
                    } else {
                      setReportType && setReportType(e.currentTarget.value);
                    }
                  }} checked={reportType === repType} type="checkbox" />
                </div>
              ))
            }

          </div>
        </div>}

      </div>
    </>
  )
}

export default SideNavigation;