import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import LoadingCircle from "components/LoadingCircle/LoadingCircle";
import { CourseItem } from "../../../models";
import { limitWordLength } from "../../../utils";

interface Props {
  courseList: CourseItem[];
}

function StaticCourseList({ courseList }: Props) {
  return (
    <div className="bg-white pt-10 pb-20 rounded-md text-center">
      <h2 className="capitalize text-xl mb-6">Top 25 best courses</h2>

      {courseList.length < 1 && <LoadingCircle />}
      {courseList.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Views</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="right">Student Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courseList.map((course) => (
                <TableRow
                  key={course.maKhoaHoc}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {limitWordLength(course.tenKhoaHoc, 40)}
                  </TableCell>
                  <TableCell align="right">{course.luotXem}</TableCell>
                  <TableCell align="right">{course.ngayTao}</TableCell>
                  <TableCell align="right">{course.soLuongHocVien}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default StaticCourseList;
