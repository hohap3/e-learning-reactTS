import { Drawer, DrawerProps } from "antd";
import React, { ReactElement, useState } from "react";

interface Props {
  openDrawer: boolean;
  title: string;
  children: ReactElement;
  onClose: () => void;
}

function DrawerModel({ openDrawer, title, children, onClose }: Props) {
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");

  return (
    <>
      <Drawer
        open={openDrawer}
        title={title}
        placement={placement}
        closable={false}
        onClose={onClose}
        size="large"
      >
        {children}
      </Drawer>
    </>
  );
}

export default DrawerModel;
