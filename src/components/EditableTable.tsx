import React, { useContext, useEffect, useRef, useState } from 'react';
import { 
  Form,
  Input,
  Button,
  Table,
  Popconfirm,
  Select
 } from 'antd';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }: any) => {
  const [form]: any = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  options,
  record,
  handleSave,
  ...restProps
}: any) => {
  const [editing, setEditing] = useState(false);
  const inputRef: any = useRef(null);
  const form: any = useContext(EditableContext);
  
  useEffect(() => {
    if (editing) {
      if (options) inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    // console.log(options)
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;
  
  if (editable) {
    
    childNode = editing ? (
      <Form.Item
        style={{margin: 0}}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          }
        ]}
      >
        {options ? 
        <Select ref={inputRef} onChange={save} onBlur={save}>
         {options.map((option: any) => (<Select.Option key={option.id} value={option.name}>{option.name}</Select.Option>))}
        </Select> :
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  
  return <td {...restProps}>{childNode}</td>;
}

type EditableTableProps = {
    data: any[],
    columns: any[],
    // handleAdd: () => void,
    // handleSave: () => void
}

const EditableTable = (props: any) => {

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        }
    };

    const columns = props.columns.map((col: any) => {
        if (!col.editable) {
            return col;
        }
        
        return {
            ...col,
            onCell: (record: any) => ({
              record,
              options: col.options,
              editable: col.editable,
              dataIndex: col.dataIndex,
              title: col.title,
              handleSave: props.onSave
            }),
        };
    });

    return (
        <div>
          <Button
            onClick={props.onAdd}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Добавить позицию
          </Button>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={props.data}
            columns={columns}
          />
        </div>
      );
}

export  {EditableTable, EditableCell, EditableRow }