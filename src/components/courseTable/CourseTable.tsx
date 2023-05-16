import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CourseItem } from "../../models";
import Swal from "sweetalert2";

interface Props {
  registerCourseList: CourseItem[];
  onUnregister: (courseCode: string) => void;
}

function CourseTable({ registerCourseList, onUnregister }: Props) {
  function handleUnRegister(courseName: string, courseCode: string) {
    if (!onUnregister) return;

    Swal.fire({
      title: `Do you want to unregister course "${courseName}"`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, unregister course!",
      cancelButtonText: "No, cancel!",
      reverseButtons: false,
    }).then((result) => {
      if (result.isConfirmed) {
        onUnregister(courseCode);
      }
    });
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell align="left">Date</TableCell>

              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Teacher</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registerCourseList.map((course) => (
              <TableRow key={course.maKhoaHoc}>
                <TableCell component="th" scope="row">
                  {course.maKhoaHoc}
                </TableCell>
                <TableCell component="th" scope="row">
                  {course.ngayTao}
                </TableCell>

                <TableCell component="th" scope="row">
                  {course.tenKhoaHoc}
                </TableCell>

                <TableCell component="th" scope="row">
                  {course.nguoiTao.hoTen}
                </TableCell>

                <TableCell component="th" scope="row">
                  <Button
                    style={{ background: "red", color: "#fff" }}
                    title="Unregister this course"
                    onClick={() =>
                      handleUnRegister(course.tenKhoaHoc, course.maKhoaHoc)
                    }
                  >
                    UNREG
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CourseTable;
