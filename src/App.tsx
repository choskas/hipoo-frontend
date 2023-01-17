import 'jsoneditor-react/es/editor.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import "./App.css"; 
import ThemesTable from "./components/ThemesTable/ThemesTable";
import { Button, Modal, Input, Typography } from "antd";
import { createTheme, deleteTheme, editTheme, getAllThemes } from "./api/actions";
import { GetAllReponse } from "./api/types";
import { FormDataState, GetAllState } from "./types";
import { FileAddOutlined } from "@ant-design/icons";
import CustomDrawer from "./components/CustomDrawer/CustomDrawer";
import { ToastContainer, toast } from 'react-toastify';

const { Title } = Typography;
const { Search } = Input;
function App() {
  const [tableData, setTableData] = useState<GetAllState[]>([]);
  const [originalTableData, setOriginalTableData] = useState<GetAllState[]>([]);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [drawerTitle, setDrawerTitle] = useState<string>("Editar");
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [themeId, setThemeId] = useState("");
  const [formData, setFormData] = useState<FormDataState>({
    title: "",
    client: "",
    status: "",
    colors: "{}",
    logo: "",
  });
  const fetchInitApi = async () => {
    const data: GetAllReponse[] | unknown = await getAllThemes();
    if (Array.isArray(data) && data.length > 0) {
      data.forEach((item) => {
        delete item.updatedAt;
      });
      setTableData(data);
      setOriginalTableData(data);
    }
  };

  const onDelete = async () => {
    const response: any = await deleteTheme(themeId);
    toast(response.message);
    setIsOpenDelete(false)
    await fetchInitApi();
  };
  
  const onPostTheme = async () => {
    if (drawerTitle === 'Crear Tema'){
      const response: any = await createTheme(formData);
      toast(response.message);
    }
    if (drawerTitle === 'Editar') {
      const response: any = await editTheme(formData);
      toast(response.message);
    }
    setIsOpenDrawer(false);

    await fetchInitApi();
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = originalTableData.filter(item => {
      if (item.title.toLowerCase().includes(e.target.value) || item.client.toLowerCase().includes(e.target.value)){
        return item
      }
    })
    setTableData(search)
  }
  useEffect(() => {
    fetchInitApi();
  }, []);
  return (
    <div className="App">
      <ToastContainer />
      <main>
        <section className="title-wrapper">
          <Title level={2}>Consultor de temas</Title>
        </section>
        <div className="button-container">
          <Button
            onClick={() => {
              setIsOpenDrawer(true);
              setDrawerTitle("Crear Tema");
            }}
            type="primary"
            icon={<FileAddOutlined />}
          >
            Agregar nuevo tema
          </Button>
          <Search className="search-input" placeholder="Buscar" onChange={onSearch} enterButton />
        </div>
        <Modal
          title="Borrar tema"
          open={isOpenDelete}
          onOk={onDelete}
          onCancel={() => setIsOpenDelete(false)}
        >
          <p>¿Deséa borrar el tema?</p>
        </Modal>
        <CustomDrawer
          onPostTheme={onPostTheme}
          title={drawerTitle}
          setIsOpen={setIsOpenDrawer}
          isOpen={isOpenDrawer}
          formData={formData}
          setFormData={setFormData}
        />
        <ThemesTable
          setThemeId={setThemeId}
          setIsOpenDelete={setIsOpenDelete}
          isOpenDrawer={isOpenDrawer}
          setIsOpenDrawer={setIsOpenDrawer}
          drawerTitle={drawerTitle}
          setDrawerTitle={setDrawerTitle}
          tableData={tableData}
          setFormData={setFormData}
        />
      </main>
    </div>
  );
}

export default App;
