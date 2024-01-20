import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import setup from "./config/setup";
import CanvasDetails from "./components/management/CanvasDetails";
import TopPart from "./components/all_data_components/TopPart";
import TableAction from "./components/all_data_components/TableAction";
import Pagination from "./components/all_data_components/Pagination";

function All() {
  const data_store = useSelector((state) => state[setup.prefix]);
  setup.dispatch = useDispatch();
  const { get_data, set_data } = setup.actions;

  useEffect(() => {
    get_data();
  }, [data_store.search_key, data_store.show_active_data, data_store.page]);

  console.log(data_store.all_data);

  return (
    <>
      <div className="card list_card">
        <div className="card-header px-0">
          <TopPart></TopPart>
        </div>
        <div className="table-responsive card-body text-nowrap">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" className="form-check-input" />
                </th>
                <th aria-label="id" className="cursor_n_resize">
                  Banner
                </th>

                <th className="cursor_n_resize">Designation</th>

                <th className="cursor_n_resize">Nationality</th>
                <th className="cursor_n_resize">Father</th>
                <th className="cursor_n_resize">Mother</th>

                <th className="cursor_n_resize">Status</th>
                <th aria-label="actions">Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {data_store.all_data?.map((data, index) => {
                return (
                  <tr key={data.id}>
                    <td>
                      <input type="checkbox" className="form-check-input" />
                    </td>
                    <td>
                      <span>
                        <img width="40px" src={data?.banner_profile_pic} alt="" />
                      </span>
                    </td>
                    <td>
                      <span
                        onClick={() => set_data(data._id)}
                        className="cursor_pointer text-warning"
                      >
                        {data.designation}
                      </span>
                    </td>
                    <td>
                      <span>{data.nationality}</span>
                    </td>
                    <td>
                      <span>{data.father_name}</span>
                    </td>
                    <td>
                      <span>{data.mother_name}</span>
                    </td>
                    <td>
                      {data.status == 1 ? (
                        <span className="badge rounded rounded-pill bg-success">
                          active
                        </span>
                      ) : (
                        <span className="badge rounded rounded-pill bg-secondary">
                          deactive
                        </span>
                      )}
                    </td>
                    <td>
                      <TableAction data={data}></TableAction>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="card-footer py-1">
          <Pagination></Pagination>
        </div>
      </div>
      <CanvasDetails></CanvasDetails>
    </>
  );
}

export default All;
