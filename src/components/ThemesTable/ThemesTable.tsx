import { Table, Tag } from "antd";
import { ThemesTableProps } from "./types";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { OptionsContainer } from "./ThemesTable.styles";
import { GetAllState } from "../../types";

const ThemesTable = ({
  tableData,
  isOpenDrawer,
  setIsOpenDrawer,
  drawerTitle,
  setDrawerTitle,
  setIsOpenDelete,
  setThemeId,
  setFormData
}: ThemesTableProps) => {
  const openDrawerEdit = (item: GetAllState) => {
    setIsOpenDrawer(true);
    setDrawerTitle("Editar");
    setFormData(item)
  };
  const columns: ColumnsType<GetAllState> = [
    {
      title: "Tema",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Cliente",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Estatús",
      dataIndex: "status",
      key: "status",
      sorter: (a: any, b: any) => a.status.length - b.status.length,
      render: (value: string) => {
        let status = "success";
        switch (value) {
          case "BORRADOR":
            status = "warning";
            break;
          case "BORRADO":
            status = "error";
            break;
          case "PUBLICADO":
            status = "success";
            break;
        }
        return <Tag color={status}>{value}</Tag>;
      },
    },
    {
      title: "Creado",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string) => {
        const date = new Date(value).toLocaleDateString("en-GB");
        return <span>{date}</span>;
      },
    },
    {
      title: "Opciones",
      key: "action",
      render: (item: GetAllState) => {
        return (
          <OptionsContainer>
            <EditOutlined onClick={() => openDrawerEdit(item)} size={24} color="blue" />
            <DeleteOutlined
              onClick={() => {
                setThemeId(item._id)
                setIsOpenDelete(true)
              }}
              size={24}
              twoToneColor="red"
            />
          </OptionsContainer>
        );
      },
    },
  ];
  return (
    <>
      <Table dataSource={tableData} columns={columns} />
    </>
  );
};

export default ThemesTable;
