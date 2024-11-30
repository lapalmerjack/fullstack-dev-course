import { useSelector } from "react-redux";
import { getUsers } from "./helperfunctions";
import { Link } from "react-router-dom";
import {Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';


const Users = () => {
  const blogs = useSelector((state) => state.blogs);
  const users = getUsers(blogs);
  console.log(users, "Are theuser users");

  return (
    <div>
      <h1>Users</h1>
      <TableContainer component={Paper}>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>  </TableCell>
                    <TableCell>Blogs Created</TableCell>
                </TableRow>
              
                {users.map( user => (
                   <TableRow key={user.id}>
                    <TableCell>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </TableCell>
                    <TableCell>
                        {user.count}
                    </TableCell>
                   </TableRow>
                ))}

            </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};



export default Users;
