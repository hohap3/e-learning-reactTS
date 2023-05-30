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
import * as yup from "yup";

interface Props {
  initialValues: CourseProps;
  onSubmitCourse: (formValues: CourseProps) => void;
  formSchema: yup.AnyObjectSchema;
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

  useEffect(() => {
    return () => {
      // URL.revokeObjectURL used for remove temp url
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

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
  } = useController({ name: "hinhAnhFile", control });

  function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file: MyObject = e.target.files[0];
    e.target.value = "";
    // create temp url
    file.preview = URL.createObjectURL(file);
    setAvatar(file);

    onChange(file);
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
        name="maDanhMucKhoaHoc"
        data={categoryList}
        control={control}
      />

      <div className="mb-6">
        <FormControl error={invalid}>
          <FilledInput
            name="hinhAnhFile"
            type="file"
            onChange={handleChangeImage}
          />
          <FormHelperText>
            {errors["hinhAnhFile"]?.message
              ? `${errors["hinhAnhFile"].message}`
              : ""}
          </FormHelperText>
        </FormControl>

        <div className="my-6">
          {avatar ? (
            <img
              src={avatar.preview}
              className="w-40 border"
              onError={handleErrorImage}
            />
          ) : (
            <img
              src={initialValues.hinhAnh}
              className="w-40 border"
              onError={handleErrorImage}
            />
          )}
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
