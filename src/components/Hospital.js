import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePagination from "@material-ui/core/TablePagination";

function Row(props) {
  const { row } = props;
  let navigate = useNavigate();
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.userId}</TableCell>
        <TableCell align="right">{row.date}</TableCell>
        <TableCell align="center">
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
            }}
          >
            <EditIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/update`, {
                  state: { type: "hospital" },
                });
              }}
            />
            <DeleteIcon />
          </div>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function Hospital() {
  const [tableData, setTableData] = useState([]);
  let navigate = useNavigate();
  const getOrders = () => {
    axios.get(`https://fakestoreapi.com/carts`).then((res) => {
      console.log(res);
      setTableData(res.data);
    });
  };
  useEffect(() => {
    getOrders();
  }, []);

  console.log(tableData);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          padding: "5px",
          marginLeft: "250px",
          marginTop: "80px",
        }}
      >
        <button
          onClick={() => {
            navigate(`/add`, {
              state: { type: "hospital" },
            });
          }}
          style={{ cursor: "pointer", width: "150px" }}
        >
          Add New Hospital
        </button>
      </div>
      <TableContainer component={Paper}>
        <Table
          aria-label="simple table"
          sx={{ width: "1290px", marginLeft: 30, marginTop: 10 }}
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>
                Hospital Name
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                City
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                State
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}

export default Hospital;
