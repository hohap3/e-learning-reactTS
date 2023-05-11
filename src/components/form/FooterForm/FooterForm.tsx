import { Button } from "@mui/material";
import React from "react";
import InputFooterField from "../form-control/InputFooterField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { footerEmailSchema } from "../../../schemas";

interface Email {
  email: string;
}

interface Props {
  onSubmit: (formValues: Email) => void;
}

function FooterForm({ onSubmit }: Props) {
  const { control, handleSubmit } = useForm<Email>({
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(footerEmailSchema),
  });

  function handleSubmitForm(formValues: Email) {
    if (!onSubmit) return;
    onSubmit(formValues);
  }

  return (
    <section className="my-4">
      <form
        onSubmit={handleSubmit(handleSubmitForm, (error) => console.log(error))}
      >
        <div className="flex justify-between items-center gap-4 bg-white px-3 py-2 rounded">
          <InputFooterField
            name="email"
            control={control}
            placeholder="Insert your email"
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ textTransform: "capitalize", background: "#06bbcc" }}
          >
            SignUp
          </Button>
        </div>
      </form>
    </section>
  );
}

export default FooterForm;
