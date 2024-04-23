import React, { useState } from "react";
import { deleteTasks } from "../utils/axiosHelper";

export const Table = ({ entryList, switchTask, fetchAllTasks }) => {
  const [idsToDelete, setIdsToDelete] = useState([]);

  const entries = entryList.filter((item) => item.type === "entry");
  const badList = entryList.filter((item) => item.type === "bad");

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      //add
      setIdsToDelete([...idsToDelete, value]);
    } else {
      //remove

      setIdsToDelete(idsToDelete.filter((_id) => _id !== value));
    }
  };

  const handleOnSelectAll = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);
    const ids =
      value === "entry"
        ? entries.map((item) => item._id)
        : badList.map((item) => item._id);

    checked
      ? setIdsToDelete([...new Set([...idsToDelete, ...ids])])
      : setIdsToDelete(idsToDelete.filter((id) => !ids.includes(id)));

    //   if (value === "entry") {
    //     if (checked) {
    //       //get all ids of entry and add to idstodelte
    //     } else {
    //       //remove all the ids of entry from idstodelte
    //     }
    //   }
    //   if (value === "bad") {
    //     if (checked) {
    //       //get all ids of bad and add to idstodelte
    //     } else {
    //       //remove all the ids of bad from idstodelte
    //     }
    //   }
    // };
    // if(){

    // }else if(){

    // }else if{

    // }else if(){

    // }
  };

  const handOnDelete = async () => {
    if (window.confirm("Are you sure, you want to delete the item?")) {
      const { status, message } = await deleteTasks(idsToDelete);
      console.log(status, message);
      if (status === "success") {
        fetchAllTasks();
        setIdsToDelete([]);
        alert(message);
      }
    }
  };
  console.log(idsToDelete);
  return (
    <>
      <div className="row mt-5 pt-2">
        {/* <!-- 1. entry list --> */}
        <div className="col-md">
          <h3 className="text-center">Task Entry List</h3>
          <hr />
          <div>
            <input
              type="checkbox"
              className="form-check-input"
              id="selectEntryList"
              onChange={handleOnSelectAll}
              value="entry"
              checked={entries.every((item) => idsToDelete.includes(item._id))}
            />
            <label htmlFor="selectEntryList">Select all entry list</label>
          </div>
          <table className="table table-striped table-hover border opacity">
            <tbody id="entry">
              {entries.map((item, i) => (
                <tr key={item._id}>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={handleOnSelect}
                      value={item._id}
                      checked={idsToDelete.includes(item._id)}
                    />
                  </td>
                  <td>{i + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.hr}hrs</td>
                  <td className="text-end">
                    {/* <button
                    onClick={() => handOnDelete(item._id)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button> */}
                    <button
                      onClick={() => switchTask(item._id, "bad")}
                      className="btn btn-success btn-sm"
                    >
                      <i className="fa-sharp fa-solid fa-arrow-right-long"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <!-- 2. bad list  --> */}
        <div className="col-md">
          <h3 className="text-center">Bad List</h3>
          <hr />
          <div>
            <input
              type="checkbox"
              className="form-check-input"
              id="selectEntryList"
              onChange={handleOnSelectAll}
              value="bad"
              checked={badList.every((item) => idsToDelete.includes(item._id))}
            />
            <label htmlFor="selectEntryList">Select all bad list</label>
          </div>
          <table className="table table-striped table-hover border opacity">
            <tbody id="bad">
              {badList.map((item, i) => (
                <tr key={i}>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={handleOnSelect}
                      value={item._id}
                      checked={idsToDelete.includes(item._id)}
                    />
                  </td>
                  <td>{i + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.hr}hrs</td>
                  <td className="text-end">
                    <button
                      onClick={() => switchTask(item._id, "entry")}
                      className="btn btn-warning btn-sm"
                    >
                      <i className="fa-sharp fa-solid fa-arrow-left-long"></i>
                    </button>
                    {/* <button
                    onClick={() => handOnDelete(item._id)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="alert alert-info">
            You could have save ={" "}
            <span id="badHr">
              {badList.reduce((acc, item) => acc + item.hr, 0)}
            </span>
            hr
          </div>
        </div>
      </div>

      {idsToDelete.length > 0 && (
        <div className="d-grid mb-3">
          <button className="btn btn-danger btn-lg" onClick={handOnDelete}>
            <i className="fa-solid fa-trash"></i> Delete {idsToDelete.length}{" "}
            task(s)
          </button>
        </div>
      )}
    </>
  );
};
