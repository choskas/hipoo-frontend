import React, {useEffect} from "react";
import { Button, Drawer, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { DrawerContent, UploadInput } from "./CustomDrawer.styled";
import { CustomDrawerProps } from "./types";
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
  const getFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  console.log(formData, 'formdata');
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
    if (title === 'Editar'){
      console.log(preview, 'asasasass')
      setPreview({name: 'Logo original', preview: formData?.logo as string})
    } else {
      setFormData(null)
      setPreview(null)
    }
  },[title, isOpen])
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
          placeholder="Tema"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />
        <small>Max. 35 caracteres</small>
        <Input
          placeholder="Cliente"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, client: e.target.value })
          }
          value={formData?.client}
        />
        <Select
          onChange={(value: string) =>
            setFormData({ ...formData, status: value })
          }
          options={options}
          value={formData?.status}
        />
        <TextArea
          value={formData?.colors}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setFormData({ ...formData, colors: e.target.value })
          }
          placeholder="Paleta de colores"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
        <UploadInput className="file-input">
          <input type="file" onChange={getFile} />
          <span className="button">Sube tu logo</span>
          <span className="label" data-js-label>
            {!preview?.name ? "Sin archivo" : preview?.name}
          </span>
        </UploadInput>
        {preview?.preview && <img src={preview.preview} alt={preview.name} />}
        <Button onClick={onPostTheme} type="primary">Guardar tema</Button>
      </DrawerContent>
    </Drawer>
  );
};
export default CustomDrawer;
