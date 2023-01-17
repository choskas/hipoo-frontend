import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { DrawerContent, UploadInput } from "./CustomDrawer.styled";
import { CustomDrawerProps, IsErrorForm } from "./types";
// @ts-ignore
import { JsonEditor as Editor } from "jsoneditor-react";
import { toast } from "react-toastify";
const CustomDrawer = ({
  setIsOpen,
  isOpen,
  title,
  formData,
  setFormData,
  onPostTheme,
}: CustomDrawerProps) => {
  const [preview, setPreview] = useState<{
    name: string;
    preview: string | null;
  } | null>(null);
  const [isError, setIsError] = useState<IsErrorForm>({
    title: false,
    client: false,
    color: false,
    logo: false,
    status: false,
  });
  const [isOpenEditor, setIsOpenEditor] = useState<boolean>(false);
  const getFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError({ ...isError, logo: false });
    if (e.target?.files) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview({ name: file.name, preview: reader.result as string });
        setFormData({ ...formData, logo: reader.result });
      };
    }
  };
  console.log(formData, "asasasadsad");
  const onError = () => {
    const errorObject = {
      title: false,
      client: false,
      color: false,
      logo: false,
      status: false,
    };
    switch (true) {
      case !formData?.title ||
        (formData?.title && formData?.title?.length > 35):
        setIsError({ ...isError, title: true });
        errorObject.title = true;
        break;
      case !formData?.client:
        setIsError({ ...isError, client: true });
        errorObject.client = true;
        break;
      case !formData?.status:
        setIsError({ ...isError, status: true });
        errorObject.status = true;
        break;
      case formData?.colors === "{}":
        setIsError({ ...isError, color: true });
        errorObject.color = true;
        break;
      case !formData?.logo:
        setIsError({ ...isError, logo: true });
        errorObject.logo = true;
        break;
    }
    console.log(
      errorObject,
      Object.values(errorObject).includes(true),
      formData,
      "<<<<<<<"
    );
    return Object.values(errorObject).includes(true);
  };

  const options = [
    {
      value: "BORRADOR",
      label: "BORRADOR",
    },
    {
      value: "PUBLICADO",
      label: "PUBLICADO",
    },
    {
      value: "BORRADO",
      label: "BORRADO",
    },
  ];

  useEffect(() => {
    if (title === "Editar") {
      setPreview({ name: "Logo original", preview: formData?.logo as string });
    } else {
      setFormData({
        title: "",
        client: "",
        status: "",
        colors: "{}",
        logo: "",
      });
      setPreview(null);
    }
  }, [title, isOpen]);
  console.log(formData, "asas");
  return (
    <Drawer
      title={title}
      placement="right"
      onClose={() => setIsOpen(false)}
      open={isOpen}
    >
      <DrawerContent>
        <Input
          value={formData?.title}
          style={{ borderColor: isError.title ? "red" : "" }}
          placeholder="Tema"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, title: e.target.value });
            setIsError({ ...isError, title: false });
          }}
        />
        <small>Max. 35 caracteres</small>
        <Input
          placeholder="Cliente"
          style={{ borderColor: isError.client ? "red" : "" }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, client: e.target.value });
            setIsError({ ...isError, client: false });
          }}
          value={formData?.client}
        />

        <Select
          style={{ borderColor: isError.status ? "red" : "" }}
          showSearch
          placeholder="Select a person"
          onChange={(value: string) => {
            setFormData({ ...formData, status: value });
            setIsError({ ...isError, status: false });
          }}
          options={options}
          value={formData?.status}
        />

        <Button
          style={{ borderColor: isError.color ? "red" : "" }}
          onClick={() => {
            setIsOpenEditor(true);
            setIsError({ ...isError, color: false });
          }}
          type="default"
        >
          {formData?.colors !== "{}" ? "Edita" : "Agrega"} el JSON de tu paleta
          de colores aquí
        </Button>
        <Modal
          open={isOpenEditor}
          onCancel={() => setIsOpenEditor(false)}
          onOk={() => setIsOpenEditor(false)}
        >
          <Editor
            value={formData?.colors && JSON.parse(formData?.colors)}
            onChange={(value: string) =>
              setFormData({ ...formData, colors: JSON.stringify(value) })
            }
          />
        </Modal>
        <UploadInput className="file-input">
          <input type="file" onChange={getFile} />
          <span
            className="button"
            style={{ border: isError.logo ? "1px solid red" : "" }}
          >
            Sube tu logo
          </span>
          <span className="label" data-js-label>
            {!preview?.name ? "Sin archivo" : preview?.name}
          </span>
        </UploadInput>
        {preview?.preview && <img src={preview.preview} alt={preview.name} />}
        <Button
          onClick={() => {
            if (onError()) {
              toast("Debes llenar todos los campos", {
                position: "top-right",
                type: "error",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              return;
            }
            onPostTheme();
          }}
          type="primary"
        >
          Guardar tema
        </Button>
      </DrawerContent>
    </Drawer>
  );
};
export default CustomDrawer;
