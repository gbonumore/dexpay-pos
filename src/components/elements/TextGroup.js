import React from 'react';
import styled from 'styled-components';

const Field = styled.div`
  padding: 20px 20px;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
`;
const Label = styled.label`
  text-align: left;
`;
const Input = styled.input`
  border: none;
  box-shadow: none;
`;

const TextGroup = ({ label, placeholder, error, ...otherProps }) => (
  <Field className="field is-horizontal">
    <div className="field-label is-normal">
      <Label className="label">{label}</Label>
    </div>
    <div className="field-body">
      <div className="field">
        <div className="control">
          <Input
            className="input"
            type="text"
            placeholder={placeholder}
            {...otherProps}
          />
          {error && <p className="help is-danger">{error}</p>}
        </div>
      </div>
    </div>
  </Field>
);

export default TextGroup;
