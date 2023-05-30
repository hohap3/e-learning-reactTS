import React, { ReactElement } from "react";

interface Props {
  title: string;
  children: ReactElement;
}

function AdminLayoutPage({ title, children }: Props) {
  return (
    <section className="bg-white py-8 px-4 rounded-md">
      <h2 className="capitalize text-2xl text-center">{title}</h2>
      <div className="my-6">{children}</div>
    </section>
  );
}

export default AdminLayoutPage;
