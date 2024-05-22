import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F6F2E4;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const Title = styled.h2`
  color: #38588e;
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: calc(50% - 10px);
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #ffd700;
  color: #fff;
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #e0b800;
  }
`;

const AddTenant = () => {
  return (
    <FormContainer>
      <Title>הוספת דייר</Title>
      <FormRow>
        <Input type="text" placeholder="שם משפחה" />
        <Input type="text" placeholder="שם פרטי" />
      </FormRow>
      <FormRow>
        <Input type="date" placeholder="תאריך לידה" />
        <Input type="text" placeholder="תעודת זהות" />
      </FormRow>
      <FormRow>
        <Input type="date" placeholder="תאריך כניסה לבית" />
        <Input type="text" placeholder="עיר מגורים קודמת" />
      </FormRow>
      <FormRow>
        <Input type="text" placeholder="טלפון" />
        <Input type="text" placeholder="מקצוע" />
      </FormRow>
      <FormRow>
        <Input type="text" placeholder="טלפון קרוב משפחה" />
        <Input type="text" placeholder="איש קשר קרוב משפחה" />
      </FormRow>
      <FormRow>
        <Input type="file" placeholder="תמונה" />
        <Input type="text" placeholder="חוגים" />
      </FormRow>
      <Button>הוספה</Button>
    </FormContainer>
  );
};

export default AddTenant;
