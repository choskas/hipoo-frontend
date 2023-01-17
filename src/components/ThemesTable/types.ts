import { FormDataState, GetAllState } from "../../types"

export type ThemesTableProps = {
   tableData: GetAllState[];
   isOpenDrawer: boolean;
   setIsOpenDrawer: (value: boolean) => void;
   drawerTitle: string;
   setDrawerTitle: (value: string) => void;
   setIsOpenDelete: (value: boolean) => void
   setThemeId: (value: string) => void
   setFormData: (value: FormDataState) => void
}