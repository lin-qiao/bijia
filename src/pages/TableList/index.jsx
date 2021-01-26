import { message, Image } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {  ProFormSelect } from '@ant-design/pro-form';
import React, { useState, useEffect } from 'react';
import { getList,getDetail, getPrice, searchList } from './service';
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
		title: '关键字',
		dataIndex: 'keyword',
		initialValue: '耐克 运动休闲鞋',
		valueType: 'text',
		hideInTable: true,
	},
	 {
	    title: '状态',
	    dataIndex: 'fieldName',
	    initialValue: 'SALES',
	    valueType: 'select',
	    valueEnum: {
	      PRICE: { text: '价格', status: 'PRICE' },
	      DISCOUNT: { text: '折扣', status: 'DISCOUNT'},
	      SALES: { text: '销量', status: 'SALES'},
	    },
		hideInTable: true
	  },
	  
	  
    {
      title: '商品名称',
      valueType: 'text',
	  render: (_, record) => `${record.brandName} | ${record.goodsName}`,
	  hideInSearch: true,
	  ellipsis: true,
	  width:200,
    },
	{
	  title: '商品主图',
	  dataIndex: 'goodsMainPicture',
	  valueType: 'text',
	  render:(_, record) => <Image width={50} src={record.goodsMainPicture}/>,
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
	  title: '商品类别',
	  dataIndex: 'cat2ndName',
	  valueType: 'text',
	  hideInSearch: true
	},
	{
	   title: '库存',
	   dataIndex: 'saleStockStatus',
	   valueType: 'select',
	   valueEnum: {
	     1: { text: '已抢光', status: '1'},
	     2: { text: '有库存', status: '2'},
	     3: { text: '有机会,', status: '3'},
	   },
	   hideInSearch: true
	 },
	{
	  title: '唯品会价格',
	  dataIndex: 'vipPrice',
	  valueType: 'text',
	  hideInSearch: true
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
	  title: '折扣',
	  dataIndex: 'discount',
	  valueType: 'text',
	  hideInSearch: true
	},
	
	{
	  title: '店铺',
	  valueType: 'text',
	  render: (_, record) => record.storeInfo.storeName,
	  hideInSearch: true
	},
    {
      title: '',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
		  <a href={record.destUrl} target="_black">唯品会查看</a>,
		  <a href={`https://m.poizon.com/router/product/ProductDetail?spuId=${record.productId}&sourceName=shareDetail`} target="_black">得物查看</a>
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
  
  const getPrices = async(code, goodsId) => {
  	 const {data} = await getPrice({
  		 api_key: "8cec5243ade04ed3a02c5972bcda0d3f",
  		 brandid: code,
  		 couponInfoVer: "2",
  		 freightTipsVer: "3",
  		 isUseMultiColor: "1",
  		 mid: goodsId,
  		 mvip: "true",
		 functions: "midSupportServices%2CuserContext%2CbuyLimit%2CforeShowActive%2CpanelView%2CfuturePriceView%2CshowSingleColor%2CnoProps%2Csku_price%2Cactive_price%2Cprepay_sku_price%2Creduced_point_desc%2CsurprisePrice%2CbusinessCode%2CpromotionTips%2Cinvisible%2Cflash_sale_stock%2CrestrictTips%2CfavStatus%2CbanInfo%2CfuturePrice%2CpriceChart%2CpriceView%2CquotaInfo%2CexclusivePrice%2CextraDetailImages",
  		 prepayMsgType: "1",
  		 priceViewVer: "8",
  		 promotionTipsVer: "5",
  		 salePriceTypeVer: "2",
  		 serviceTagVer: "1",
  		 supportAllPreheatTipsTypes: "1",
  		 supportSquare: "1",
  		 wap_consumer: "C2-1",
  		 warehouse: "VIP_SH",
  	 });
  	 return data?.product_price_range_mapping[goodsId]?.priceView?.finalPrice?.price
  } 
  
  
  return (
    <PageContainer>
      <ProTable
        headerTitle="唯品会商品列表"
        rowKey="goodsId"
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
				...params,
				apikey: 'SROX6xv7CUxLQQ0HUg9RjhV4lQace290',
				queryStock: true,
				page: params.current,
				pageSize: params.pageSize,
			})
			for(const obj of res.data){
				obj.goodsCode = await getCode(obj.goodsId)
				obj.vipPrice = await getPrices(obj.brandId, obj.goodsId)
				const res = await searchList(obj.goodsCode)
				const detail = res?.data?.productList?.length? res?.data?.productList[0] : null;
				obj.dewuPrice = detail? (detail.price / 100).toFixed(2) : null;
				obj.soldNum = detail? detail.soldNum : null;
				obj.productId = detail? detail.productId : null;
				obj.chajia = detail? (parseInt(obj.dewuPrice) - parseInt(obj.vipPrice)).toFixed(2) : null;
				obj.dewuDetail = detail;
			}
			return {
			   data: res.data,
			   success: true,
			   total: res.total_results,
			}
		}}
        columns={columns}
      />

    </PageContainer>
  );
};

export default TableList;
