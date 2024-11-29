import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../sevices/UserSevices';

const TableUsers = (props) => {

    const [listUser, setListUser] = useState([]);

    useEffect(()=> {
        //call apis 

        getUser();
    }, [])

    const getUser = async () =>{
        let res = await fetchAllUser();

        if(res && res.data.data){
            setListUser(res.data.data)
        }
        console.log(">>> checkres: ", res)
    }

    console.log(listUser);

    // avatar
    // : 
    // "https://reqres.in/img/faces/1-image.jpg"
    // email
    // : 
    // "george.bluth@reqres.in"
    // first_name
    // : 
    // "George"
    // id
    // : 
    // 1
    // last_name
    // : 
    // "Bluth"
    

    return (<>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First name</th>
            <th>Last name</th>
            </tr>
        </thead>
        <tbody>
            {listUser && listUser.length > 0 &&
            
            listUser.map((item, index) => {
                return(
                    <tr key={`user-${index}`}>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                    </tr>
                )
            })
            }
            
            
        </tbody>
        </Table>
    </>)
}

export default TableUsers;