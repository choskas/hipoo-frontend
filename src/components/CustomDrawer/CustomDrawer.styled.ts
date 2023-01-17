import styled from 'styled-components'

export const DrawerContent = styled.div`
    display: flex;
    flex-direction: column;
    & input {
        margin-top: 12px;
    }
    & small {
        display: flex;
        justify-content: flex-end;
        font-size: 10px;
    }
    & button {
        margin-top: 12px;
    }
    & div {
        margin-top: 12px;
    }
    & textarea {
        margin-top: 12px;
    }
`;

export const UploadInput = styled.div`
  display: inline-block;
  text-align: left;
  background: #fff;
  padding: 16px 0;
  width: 450px;
  position: relative;
  border-radius: 3px;
  & > [type='file'] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 10;
  cursor: pointer;
}
& .button {
  display: inline-block;
  cursor: pointer;
  background: #eee;
  padding: 8px 16px;
  border-radius: 2px;
  margin-right: 8px;
}
& .label {
  color: #333;
  white-space: nowrap;
  opacity: .3;
}
`;