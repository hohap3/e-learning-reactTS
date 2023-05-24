import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormControl, FormHelperText, Input } from "@mui/material";
import { useAppSelector } from "app/hooks";
import RatingField from "components/form/RatingField/RatingField";
import InputField from "components/form/form-control/InputField";
import SelectField from "components/form/form-control/SelectField";
import TextAreaField from "components/form/form-control/TextAreaField";
import { GROUP_LIST } from "constants/common";
import { CreateCourse } from "models/index";
import React, { ChangeEvent } from "react";
import { useController, useForm } from "react-hook-form";
import { selectCategoryList } from "redux/Course/courseSlice";

import { handleSubmitError } from "utils/index";

interface Props {
  initialValues: CreateCourse;
  onSubmitCourse: (formValues: CreateCourse) => void;
  formSchema: any;
}

function AddNewCourseForm({
  initialValues,
  onSubmitCourse,
  formSchema,
}: Props) {
  const categoryList = useAppSelector(selectCategoryList);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<CreateCourse>({
    defaultValues: initialValues,
    values: initialValues,
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  const {
    field: { value, onChange },
    fieldState: { invalid },
    formState: { errors },
  } = useController({ name: "hinhAnh", control });

  function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files[0];
    onChange(`${file.name}`);
  }

  function handleSubmitForm(formValues: CreateCourse) {
    if (!onSubmitCourse) return;
    onSubmitCourse(formValues);
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm, handleSubmitError)}>
      <InputField
        name="maKhoaHoc"
        label="Course's Code"
        placeholder="Insert course code..."
        control={control}
      />

      <InputField
        name="biDanh"
        label="Course's Alias"
        placeholder="Insert course alias..."
        control={control}
      />

      <InputField
        name="tenKhoaHoc"
        label="Course's Name"
        placeholder="Insert course name..."
        control={control}
      />

      <TextAreaField
        name="moTa"
        label="Description"
        control={control}
        placeholder="Insert course description..."
      />

      <SelectField name="maNhom" data={GROUP_LIST} control={control} />
      {categoryList.length > 0 && (
        <SelectField
          name="maDanhMucKhoaHoc"
          data={categoryList}
          control={control}
        />
      )}

      <div className="mb-6">
        <FormControl error={invalid}>
          <Input name="hinhAnh" type="file" onChange={handleChangeImage} />
          <FormHelperText>
            {errors["hinhAnh"]?.message ? `${errors["hinhAnh"].message}` : ""}
          </FormHelperText>
        </FormControl>
      </div>

      <RatingField name="danhGia" control={control} label="Rating " />

      <Button type="submit" variant="contained" fullWidth>
        Submit
      </Button>
    </form>
  );
}

export default AddNewCourseForm;
