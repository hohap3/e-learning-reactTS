import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Table, { ColumnsType } from "antd/es/table";
import { GROUP_LIST } from "constants/common";
import NotFoundGroup from "components/NotFoundGroup/NotFoundGroup";
import { useAppSelector } from "app/hooks";
import { selectLoadingCourse } from "redux/Course/courseSlice";
import LoadingCircle from "components/LoadingCircle/LoadingCircle";

interface Props {
  title: string;
  previousPage?: string;
  columns: ColumnsType<any>;
  dataSource: any[];
  group?: string;
  enablePagination?: false;
}

function AdminTable({
  title,
  previousPage,
  columns,
  dataSource,
  group,
  enablePagination,
}: Props) {
  const navigate = useNavigate();
  const loadingCourse = useAppSelector(selectLoadingCourse);

  // Not found group page
  if (group && !GROUP_LIST.find((groupItem) => groupItem.value === group)) {
    return <NotFoundGroup previousPage="/admin/course-list" />;
  }

  return (
    <div className="mt-8">
      <h2 className="capitalize text-2xl text-center mb-6">{title}</h2>

      {previousPage !== undefined && (
        <div className="mb-6">
          <Button
            onClick={() => navigate(`${previousPage}`)}
            variant="outlined"
            className="flex gap-4"
          >
            <ArrowBackIcon />
            Go back to list page
          </Button>
        </div>
      )}

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={enablePagination}
        loading={loadingCourse}
        scroll={{ x: true }}
      ></Table>
    </div>
  );
}

export default AdminTable;
