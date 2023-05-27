import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "app/hooks";
import RatingField from "components/form/RatingField/RatingField";
import InputField from "components/form/form-control/InputField";
import SelectField from "components/form/form-control/SelectField";
import TextAreaField from "components/form/form-control/TextAreaField";
import { GROUP_LIST } from "constants/common";
import { CourseProps, MyObject } from "models/index";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { courseAction, selectCategoryList } from "redux/Course/courseSlice";

import { getDefaultImagePath, handleSubmitError } from "utils/index";

interface Props {
  initialValues: CourseProps;
  onSubmitCourse: (formValues: CourseProps) => void;
  formSchema: any;
  isEdit: boolean;
}

function AddEditCourseForm({
  initialValues,
  onSubmitCourse,
  formSchema,
  isEdit,
}: Props) {
  const categoryList = useAppSelector(selectCategoryList);
  const dispatch = useAppDispatch();
  const [avatar, setAvatar] = useState<Partial<MyObject>>();

  useEffect(() => {
    dispatch(courseAction.fetchCourse());
  }, []);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<CourseProps>({
    defaultValues: initialValues,
    values: initialValues,
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  const {
    field: { onChange },
    fieldState: { invalid },
    formState: { errors },
  } = useController({ name: "hinhAnh", control });

  function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file: MyObject = e.target.files[0];

    file.preview = URL.createObjectURL(file);
    setAvatar(file);

    onChange(`${file.name}`);
  }

  function handleSubmitForm(formValues: CourseProps) {
    if (!onSubmitCourse) return;
    onSubmitCourse(formValues);
  }

  function handleErrorImage(e: SyntheticEvent<HTMLImageElement, ErrorEvent>) {
    const defaultImagePath = getDefaultImagePath({
      width: 318,
      height: 256,
    });
    if (!e.target) return;
    (e.target as HTMLImageElement).src = defaultImagePath;
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm, handleSubmitError)}>
      <InputField
        name="maKhoaHoc"
        label="Course's Code"
        placeholder="Insert course code..."
        control={control}
        readOnly={isEdit}
      />

      <InputField
        name="biDanh"
        label="Course's Alias"
        placeholder="Insert course alias..."
        control={control}
        readOnly={isEdit}
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

      <SelectField
        name="maDanhMucKhoahoc"
        data={categoryList}
        control={control}
      />

      <div className="mb-6">
        <FormControl error={invalid}>
          <FilledInput
            name="hinhAnh"
            type="file"
            onChange={handleChangeImage}
          />
          <FormHelperText>
            {errors["hinhAnh"]?.message ? `${errors["hinhAnh"].message}` : ""}
          </FormHelperText>
        </FormControl>

        <div className="my-6">
          {initialValues.hinhAnh && (
            <img
              src={initialValues.hinhAnh}
              className="w-40 border"
              onError={handleErrorImage}
            />
          )}
          {avatar && <img src={avatar.preview} className="w-40 border" />}
        </div>
      </div>

      <RatingField name="danhGia" control={control} label="Rating " />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isSubmitting}
      >
        {isEdit ? "Save" : "Submit"}
      </Button>
    </form>
  );
}

export default AddEditCourseForm;
