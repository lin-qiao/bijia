import { message, Image, Select } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {  ProFormSelect } from '@ant-design/pro-form';
import React, { useState, useEffect } from 'react';
import { getList } from './service';
import './index.css'
const TableList = () => {
    const [rowId, setRowId] = useState(null);
	const [sorters, setSorters] = useState('{}');
	 // 选中行
	 const onClickRow = (record) => {
	    return {
	      onClick: () => {
	        setRowId(record.goodsId)
	      },
	    };
	  }
	  const setRowClassName = (record) => {
	    return record.goodsId === rowId ? 'clickRowStyl' : '';
	  }
	  
  const columns = [
	  {
	    title: '专场',
	    dataIndex: 'brandId',
		initialValue: '100786243',
	    valueType: 'select',
	    valueEnum: {
	      100786243: { text: '耐克', status: '100786243' },
	      100722917: { text: '彪马', status: '100722917' },
	      100908165: { text: '安踏', status: '100908165' },
	      100926957: { text: '匡威', status: '100926957' },
	      100926915: { text: '阿迪', status: '100926915' },
	      100926931: { text: '李宁', status: '100926931' },
	    },
		hideInTable: true
	  },
	  
    {
      title: '商品名称',
			dataIndex: 'goods_name',
      valueType: 'text',
			hideInSearch: true,
			ellipsis: true,
			width:200,
    },
	{
	  title: '商品主图',
	  valueType: 'text',
	  render:(_, record) => <Image width={50} src={record.goods_img}/>,
	  hideInSearch: true
	},
	{
	  title: '商品货号',
	  valueType: 'text',
	  dataIndex: 'goods_code',
	  hideInSearch: true
	},
	{
	   title: '库存',
		 valueType: 'text',
		 dataIndex: 'stock',
	   hideInSearch: true
	 },
	{
	  title: '唯品会价格',
	  valueType: 'text',
		dataIndex: 'vip_price',
		render: (_, record) => (record.vip_price / 100).toFixed(2),
	  hideInSearch: true,
	},
	{
	  title: '得物名称',
	  valueType: 'text',
	  hideInSearch: true,
	  ellipsis: true,
		dataIndex: 'deiwu_name',
	  width:200,
	},
	{
	  title: '得物价格',
	  dataIndex: 'deiwu_price',
	  valueType: 'text',
	  render: (_, record) => (record.deiwu_price / 100).toFixed(2),
	  hideInSearch: true
	},
	{
	  title: '得物图片',
	  valueType: 'text',
	  hideInSearch: true,
	  render:(_, record) => <Image width={50} src={record.deiwu_img}/>
	},
	{
	  title: '得物货号',
	  valueType: 'text',
		dataIndex: 'deiwu_code',
	  hideInSearch: true,
	},
	
	{
	  title: '得物销量',
	  dataIndex: 'deiwu_sales',
	  valueType: 'text',
	  hideInSearch: true,
	},
	
	{
	  title: '差价',
	  dataIndex: 'difference_price',
	  valueType: 'text',
	  render: (_, record) => (record.difference_price / 100).toFixed(2),
	  hideInSearch: true
	},
    {
      title: '',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
		  <a href={`https://m.vip.com/product-${record.brand}-${record.vip_id}.html`} target="_black">唯品会查看</a>,
		  <a href={`https://m.poizon.com/router/product/ProductDetail?spuId=${record.deiwu_id}&sourceName=shareDetail`} target="_black">得物查看</a>
      ],
	  hideInSearch: true
    },
  ];
  
  
  const getCode = async(code) => {
	 const {data} = await getDetail({
		 productId: code
	 });
	 return data?.product?.merchandiseSn
  } 
  
  return (
    <PageContainer>
      <ProTable
        headerTitle="唯品会商品列表"
        rowKey="goodsId"
		pagination={{
			pageSize: 100,
		}}
        search={{
          labelWidth: 120,
        }}
		scroll={{ y: 800 }}
		onRow={onClickRow}
		 rowClassName={setRowClassName}
        request={async (params, sorter, filter) => {

			console.log(params)
			const res = await getList({
				brandId: params.brandId,
				page: params.current,
				size: params.pageSize,
				categoryId: params.categoryId
				
			})
			return {
			   data: res.data,
			   success: true,
			   total: res.total,
			}
		}}
        columns={columns}
      />

    </PageContainer>
  );
};

export default TableList;
