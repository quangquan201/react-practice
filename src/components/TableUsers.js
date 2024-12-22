import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../sevices/UserSevices";
import ReactPaginate from "react-paginate";
import ModalAddNew from './ModalAddNew';
import ModalEditUser from "./ModalEditUser";
import _ from "lodash";
import ModalConfirm from "./ModalConfirm";

const TableUsers = (props) => {
  const [listUser, setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew , setIsShowModalAddNew] = useState(false);

  const [isShowModalEdit , setIsShowModalEdit] = useState(false);
  const [dataUserEdit , setdataUserEdit] = useState({});

  const [isShowModalDelete , setIsShowModalDelete] = useState(false);
  const [dataUserDelete , setDsataUserDelete] = useState({});

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  }

  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser])
  }

  const handleEditUserFromModal = (user) => {

    let cloneListUser = _.cloneDeep(listUser);
    let index = listUser.findIndex(item => item.id === user.id);
    cloneListUser[index].first_name = user.first_name; 
    setListUser(cloneListUser);

    console.log(user)
  } 

  useEffect(() => {
    //call apis

    getUser(1);
  }, []);

  const getUser = async (page) => {
    let res = await fetchAllUser(page);

    if (res && res.data) {
      setTotalUsers(res.total);
      setListUser(res.data);
      setTotalPages(res.total_pages);
    }
  };

  const handlePageClick = (event) => {
    console.log("event lib:  ", event);
    getUser(+event.selected + 1);
  };

  const handleEditUser = (user) => {
    setdataUserEdit(user);
    setIsShowModalEdit(true);
  }

  const handleDelete = (user) => {
    setIsShowModalDelete(true);
    setDsataUserDelete(user);
  }

  const handleDeleteUserFromModal = (user) => {

    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = cloneListUser.filter(item => item.id !== user.id)
    setListUser(cloneListUser);
  } 

  return (
    <>
    
      <div className='my-3 add-new'>
        <span><b>List Users:</b></span>
        <button className='btn btn-success' 
        onClick={()=> setIsShowModalAddNew(true)}
        >Add new user</button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleEditUser(item)}
                    >Edit</button>
                    <button 
                      className="btn btn-danger "
                      onClick={() => handleDelete(item)}
                    >Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkclassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />

      <ModalAddNew
        show = {isShowModalAddNew}
        handleClose = {handleClose}
        handleUpdateTable = {handleUpdateTable}
      />

      <ModalEditUser
        show = {isShowModalEdit}
        handleClose = {handleClose}
        dataUserEdit = {dataUserEdit}
        handleEditUserFromModal = {handleEditUserFromModal}
      />

      <ModalConfirm
        show = {isShowModalDelete}
        handleClose = {handleClose}
        dataUserDelete = {dataUserDelete}
        handleDeleteUserFromModal = {handleDeleteUserFromModal}
      />

    </>
  );
};

export default TableUsers;
