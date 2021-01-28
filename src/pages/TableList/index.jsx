import { message, Image, Select } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {  ProFormSelect } from '@ant-design/pro-form';
import React, { useState, useEffect } from 'react';
import { getList, getCategory, getDetail, getPrice, searchList } from './service';
import './index.css'
const MySelect = ({brandId, value, onChange}) => {
	const [options, setOptions] = useState([]);
	useEffect(() => {
		getCategory({
			brandId
		}).then(res => {
			const list = res.data.map(item => ({
				label: item.name,
				value: item.id
			}))
			setOptions(list)
		})
	}, [brandId])
	return (
		<Select options={options} value={value} onChange={onChange} />
	)
}
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
	  	title: '分类',
	  	dataIndex: 'categoryId',
	  	hideInTable: true,
		renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
			const brandId = form.getFieldValue('brandId');
			if (!brandId) {
			  return null;
			}
			return (
			  <MySelect
				{...rest}
				brandId={brandId}
			  />
			);
		  },
	  },
	  
    {
      title: '商品名称',
			dataIndex: 'title',
      valueType: 'text',
			hideInSearch: true,
			ellipsis: true,
			width:200,
    },
	{
	  title: '商品主图',
	  dataIndex: 'smallImage',
	  valueType: 'text',
	  render:(_, record) => <Image width={50} src={record.smallImage}/>,
	  hideInSearch: true
	},
	{
	  title: '商品货号',
	  valueType: 'text',
	  dataIndex: 'goodsCode',
	  render: (_, record) => record.goodsCode,
	  hideInSearch: true
	},
	{
	   title: '库存',
	   render: (_, record) => record?.stockLabel?.value,
	   hideInSearch: true
	 },
	{
	  title: '唯品会价格',
	  valueType: 'text',
	  hideInSearch: true,
	  render: (_, record) => record?.price?.salePrice,
	},
	{
	  title: '得物名称',
	  valueType: 'text',
	  hideInSearch: true,
	  ellipsis: true,
	  render: (_, record) => record?.dewuDetail?.title,
	  width:200,
	},
	{
	  title: '得物价格',
	  dataIndex: 'dewuPrice',
	  valueType: 'text',
	  hideInSearch: true
	},
	{
	  title: '得物图片',
	  valueType: 'text',
	  hideInSearch: true,
	  render:(_, record) => <Image width={50} src={record?.dewuDetail?.logoUrl}/>
	},
	{
	  title: '得物货号',
	  valueType: 'text',
	  hideInSearch: true,
	  render: (_, record) => record?.dewuDetail?.articleNumber,
	},
	
	{
	  title: '得物销量',
	  dataIndex: 'soldNum',
	  valueType: 'text',
	  hideInSearch: true,
	  sorter: (a, b) => a.soldNum - b.soldNum,
	},
	
	{
	  title: '差价',
	  dataIndex: 'chajia',
	  valueType: 'text',
	  sorter: (a, b) => a.chajia - b.chajia,
	  hideInSearch: true
	},
    {
      title: '',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
		  <a href={`https://m.vip.com/product-${record.brandId}-${record.productId}.html`} target="_black">唯品会查看</a>,
		  <a href={`https://m.poizon.com/router/product/ProductDetail?spuId=${record.dewuProductId}&sourceName=shareDetail`} target="_black">得物查看</a>
      ],
	  hideInSearch: true
    },
  ];
  
  
  const getCode = async(code) => {
	 const {data} = await getDetail({
		 api_key: '8cec5243ade04ed3a02c5972bcda0d3f',
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
			pageSize: 80,
		}}
        search={{
          labelWidth: 120,
        }}
		scroll={{ y: 800 }}
		onRow={onClickRow}
		 rowClassName={setRowClassName}
        request={async (params, sorter, filter) => {
			console.log(params, sorter, filter)
			if(JSON.stringify(sorter) != sorters) {
				setSorters(JSON.stringify(sorter));
				return
			};
			
			const res = await getList({
				brandId: params.brandId,
				page: params.current,
				categoryId: params.categoryId
				
			})
			for(const obj of res.data){
				obj.goodsCode = await getCode(obj.productId)
				const res = await searchList(obj.goodsCode)
				const detail = res?.data?.productList?.length? res?.data?.productList[0] : null;
				obj.dewuPrice = detail? (detail.price / 100).toFixed(2) : null;
				obj.soldNum = detail? detail.soldNum : null;
				obj.dewuProductId = detail? detail.productId : null;
				obj.chajia = detail? (parseInt(obj.dewuPrice) - parseInt(obj.price.salePrice)).toFixed(2) : null;
				obj.dewuDetail = detail;
			}
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
