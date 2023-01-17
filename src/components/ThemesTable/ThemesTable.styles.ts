import styled from "styled-components";

export const OptionsContainer = styled.div`
width: 60px;
display: flex;
justify-content: space-between;
& span{
    cursor: pointer;
    & svg[data-icon="edit"]{
        color: blue;
        font-size: 20px;
    }
    & svg[data-icon="delete"]{
        color: red;
        font-size: 20px;
    }
}
`;