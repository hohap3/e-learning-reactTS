import FormContact from "components/form/FormContact/FormContact";
import GeneralLayout from "layouts/CourseListLayout/GeneralLayout";
import WithFooterLayout from "layouts/WithFooter/WithFooterLayout";
import { Contact } from "../models";
import React from "react";

function ContactPage() {
  function handleSubmitContact(formValues: Contact) {
    console.log(formValues);
  }

  return (
    <WithFooterLayout>
      <GeneralLayout title="Home" text="Contact">
        <section className="mt-[74px] bg-[#fafafa] pb-[74px] ">
          <div className="container mx-auto ">
            <div className="p-12 bg-white rounded">
              <h2 className="text-xl font-semibold mb-6">Write to us</h2>

              <FormContact onSubmitContact={handleSubmitContact} />
            </div>
          </div>
        </section>
      </GeneralLayout>
    </WithFooterLayout>
  );
}

export default ContactPage;
