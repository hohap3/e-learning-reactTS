import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";

import userApi from "api/userAPI";
import InputField from "components/form/form-control/InputField";
import SelectField from "components/form/form-control/SelectField";
import { GROUP_LIST } from "constants/common";
import { UserCreate, UserTypeProps } from "models/index";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { handleSubmitError } from "utils/index";
import * as yup from "yup";

interface Props {
  initialValues: UserCreate;
  formSchema: yup.AnyObjectSchema;
  onSubmitForm: (formValues: UserCreate) => void;
}

function AddNewUserForm({ initialValues, formSchema, onSubmitForm }: Props) {
  const [userTypeList, setUserTypeList] = useState<UserTypeProps[]>([]);

  useEffect(() => {
    (async () => {
      const res: UserTypeProps[] = await userApi.getUserType();

      setUserTypeList(res);
    })();
  }, []);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  function handleSubmitForm(formValues: UserCreate) {
    if (!onSubmitForm) return;
    onSubmitForm(formValues);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitForm, handleSubmitError)}>
        <InputField
          name="taiKhoan"
          control={control}
          label="Account"
          placeholder="Account..."
        />

        <InputField
          name="hoTen"
          control={control}
          label="Full Name"
          placeholder="Full Name..."
        />

        <InputField
          name="soDT"
          control={control}
          label="Phone"
          placeholder="Phone..."
        />

        <InputField
          name="email"
          control={control}
          label="Email"
          placeholder="Email..."
        />

        <InputField
          name="matKhau"
          control={control}
          label="Password"
          placeholder="Password..."
          type="password"
        />

        <SelectField
          name="maLoaiNguoiDung"
          control={control}
          label="User Type"
          disabled={false}
          variant={"outlined"}
          data={userTypeList}
        />

        <SelectField
          name="maNhom"
          control={control}
          label="User Group"
          disabled={false}
          variant={"outlined"}
          data={GROUP_LIST}
        />

        <div className="flex justify-center">
          <Button
            type="submit"
            sx={{ width: "100%" }}
            variant="contained"
            disabled={isSubmitting}
          >
            Create New User
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddNewUserForm;
