import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { 
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Table,
  Popconfirm,
  FormInstance,
 } from 'antd';
import { EditableCell, EditableRow, EditableTable } from '../components/EditableTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCounterparties, fetchNomenclatures, selectCounterparties, selectLoading, selectNomenclatures } from '../redux/commonReducer';
import { INomenclature } from '../models/INomenclature';
import { IPurchasesGoods } from '../models/IPurchasesGoods';
import { IPurchase } from '../models/IPurchase';
import { newPurchase } from '../redux/purchasesReducer';


const NewPurchasePage = () => {
  const dispatch = useDispatch()
  const formRef = React.createRef<FormInstance>();


  useEffect(() => {
      dispatch(fetchCounterparties())
      dispatch(fetchNomenclatures())
  }, [])

  const onFinish = (values: any) => {
    const purchasesgoods: IPurchasesGoods[] = dataSource.map((row: any) => {
      // console.log(value)
      return {
        name: nomenclatures.find((value: INomenclature) => (value.name === row.nomenclature)),
        count: Number(row.count),
        price: Number(row.price),
        unitMeasurements: row.unitMeasurements,
      }
    })

    const totalPrice = purchasesgoods.reduce((acc: number, curr: IPurchasesGoods) => {
      return acc + curr.price
    }, 0)

    const purchase: IPurchase = {
      counterparty: counterparties[values.counterparty],
      date: new Date().toISOString(),
      totalPrice: totalPrice,
      status: values.status,
      purchasesGoods: purchasesgoods 
    }
    if (dataSource.length === 0)
      formRef.current?.setFields([
        {
          name: 'products',
          errors: ["Добавьте товар в список"]
        }
      ])
    else {
      formRef.current?.setFields([
        {
          name: 'products',
          errors: []
        }
      ])
      console.log(purchase)
      dispatch(newPurchase(purchase))
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  
  const loading = useSelector(selectLoading)
  const counterparties = useSelector(selectCounterparties)
  const nomenclatures = useSelector(selectNomenclatures)
    
  const [dataSource, setDataSource] = useState<any>([])

  const deleteHandler = (key: number) => {
    setDataSource(dataSource.filter((item: any) => item.key !== key))
  };

  useEffect(() => {
    if (dataSource.length > 0) formRef.current?.setFields([{ name: 'products', errors: [] }])
  }, [dataSource])

  const addHandler = () => {
      const newData = {
        key: dataSource.length + 1
      };
      setDataSource([...dataSource, newData] as any)
  };

  const saveHandler = (row: any) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    const nomen = nomenclatures.find((value: INomenclature) => value.name === row.nomenclature) 
    newData.splice(index, 1, { ...item, ...row, unitMeasurements: nomen?.unitMeasurement });
    setDataSource(newData)
  };

  const columns = [
    { title: 'Номенклатура', dataIndex: 'nomenclature', width: '30%', editable: true, options: nomenclatures},
    { title: 'Количество',  width: '15rem', dataIndex: 'count', editable: true },
    { title: 'Ед. Изм.', align: 'center' as const, width: '8rem', dataIndex: 'unitMeasurements', key: 'unitMeasurements'},
    { title: 'Цена', width: '15rem', dataIndex: 'price', key: 'price', editable: true },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: '6rem',
      render: (_: any, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => deleteHandler(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    }
  ];

  

  return (
    <>
    {!loading?
    <Form ref={formRef} onFinishFailed={onFinishFailed} onFinish={onFinish} labelCol={{span: 4}} wrapperCol={{span: 17}} style={{marginTop: '2rem'}} layout="horizontal">
      <Form.Item wrapperCol={{
          offset: 0,
          span: 8
        }} label="Контрагент" name='counterparty' rules={[
          {
            required: true,
            message: 'Введите контрагента!',
          },
        ]}>
        <Select>
        {counterparties.map((el, i) => (<Select.Option key={el.id} value={i}>{el.name}</Select.Option>))}
        </Select>
      </Form.Item>
      <Form.Item label="Статус" name="status"
        wrapperCol={{
          offset: 0,
          span: 4
        }}
        rules={[
          {
            required: true,
            message: 'Введите статус заказа!',
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item style={(dataSource.length > 0) ? {marginBottom: '-4.9rem'} : {}} label="Товары" name='products'>
        <EditableTable onAdd={addHandler} onDelete={deleteHandler} onSave={saveHandler} columns={columns} data={dataSource} />
      </Form.Item>
      <Form.Item wrapperCol={{
          offset: 4,
          span: 17
        }}>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form.Item>
    </Form>
    : ''}
    </>
  );
};

export default NewPurchasePage;
