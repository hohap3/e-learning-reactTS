import { COURSE_GROUP, SignUpProps } from "constants/common";
import { SignUpParams, UserSignUp } from "../../../models";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../form-control/InputField";
import CheckboxField from "../form-control/CheckboxField";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "schemas/signUpSchema";
import Swal from "sweetalert2";

interface Props {
  onSubmit: (formValues: UserSignUp) => void;
}

function FormSignUp({ onSubmit }: Props) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpParams>({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      nhapLaiMatKhau: "",
      hoTen: "",
      soDT: "",
      maNhom: COURSE_GROUP,
      email: "",
      hasAgree: false,
    },
    mode: "all",
    resolver: yupResolver(signUpSchema),
  });

  function submitErrorHandler(error: any) {
    if (Object.keys(error).length > 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please insert all field!",
      });
      return;
    }
  }

  async function handleSubmitForm(formValues: SignUpParams) {
    if (!onSubmit) return;

    try {
      // map formValues
      /**
       * keyof :
       *  It's take an object types and produces a string or numeric literal union of its key
       * If the type has a string or number index signature, keyof will return those types instead:
       *
       * Mostly used with Object.keys
       */

      const formValuesMap = { ...formValues };

      for (const key of Object.keys(formValuesMap)) {
        if (!SignUpProps.includes(key))
          delete formValuesMap[key as keyof SignUpParams];
      }

      await onSubmit(formValuesMap);
    } catch (error: any) {
      console.log(error);
      const { data, status } = error.response;
      Swal.fire({
        title: `${data}`,
        text: "You need to try create account again!",
        icon: "error",
      });
    }
  }

  useEffect(() => {
    (() => {
      document.documentElement.scrollTop = 0;
    })();
  }, []);

  return (
    <form onSubmit={handleSubmit(handleSubmitForm, submitErrorHandler)}>
      <InputField
        name="taiKhoan"
        control={control}
        placeholder="Account name"
        label="Account Name"
      />

      <InputField
        name="email"
        control={control}
        placeholder="Email"
        label="Email"
      />

      <InputField
        name="hoTen"
        control={control}
        placeholder="User name"
        label="User Name"
      />

      <InputField
        name="soDT"
        control={control}
        placeholder="Phone number"
        label="Phone"
      />

      <InputField
        name="matKhau"
        type="password"
        control={control}
        placeholder="Password"
        label="User Password"
      />

      <InputField
        name="nhapLaiMatKhau"
        type="password"
        control={control}
        placeholder="Password"
        label="Retype Password"
      />

      <CheckboxField
        name="hasAgree"
        control={control}
        label={
          <p>
            I have agree with{" "}
            <span className="text-[#06bbcc] underline">ELearning</span> term!
          </p>
        }
      />

      <div className="text-center">
        <button
          type="submit"
          className="text-white py-2 px-8 bg-[#06bbcc] rounded hover:bg-[#2bc5d4] transition-all w-full"
          disabled={isSubmitting}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default FormSignUp;
