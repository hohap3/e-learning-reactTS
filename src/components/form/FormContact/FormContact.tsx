import { useForm } from "react-hook-form";
import { Contact } from "../../../models";
import InputField from "../form-control/InputField";

import { yupResolver } from "@hookform/resolvers/yup";

import { contactSchema } from "../../../schemas";
import TextAreaField from "../form-control/TextAreaField";
import { Button } from "@mui/material";

interface Props {
  onSubmitContact: (formValues: Contact) => void;
}

function FormContact({ onSubmitContact }: Props) {
  const { control, handleSubmit } = useForm<Contact>({
    defaultValues: {
      userName: "",
      userEmail: "",
      userDescription: "",
    },
    mode: "all",
    resolver: yupResolver(contactSchema),
  });

  function handleSubmitForm(formValues: Contact) {
    if (!onSubmitContact) return;
    onSubmitContact(formValues);
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm, (error) => console.log(error))}
    >
      <InputField name="userName" control={control} placeholder="Your Name" />
      <InputField name="userEmail" control={control} placeholder="Email" />
      <TextAreaField
        name="userDescription"
        control={control}
        placeholder="Enter your descriptions here..."
      />

      <Button type="submit" variant="contained">
        Send Now
      </Button>
    </form>
  );
}

export default FormContact;
