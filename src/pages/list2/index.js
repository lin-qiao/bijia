import ProTable from '@ant-design/pro-table';
import React, { useState } from 'react';
import list from './list.json';
import { getDeiwu } from './service';
const columns = [
  {
    title: '名称',
    dataIndex: 'skuName',
  },
  {
    title: '价格',
    width: 120,
    dataIndex: 'status',
    render: (_, record) => {
		const tol = parseInt(record.price) * 3 - 350; 
		const price = tol / 3;
		return ((tol - price) / 3).toFixed(2);
	},
  },
  {
    title: '操作',
    width: 50,
    key: 'option',
    valueType: 'option',
    render: (_, record) => [
      <a key="1" href={'https://item.m.jd.com/product/'+ record.skuId + '.html'}>查看</a>,
    ],
  },
];
const expandedRowRender = ({code}) => {
  return (
    <ProTable
      columns={[
        { title: '名称', dataIndex: 'title', key: 'name' },
        { title: '价格', dataIndex: 'minSalePrice', key: 'price' },
        { title: '销量', dataIndex: 'soldNum', key: 'number' },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          valueType: 'option',
          render: (_, record) => [<a key="Pause" href={'https://m.poizon.com/router/product/ProductDetail?spuId=' + record.deiwu_id}>查看</a>],
        },
      ]}
      headerTitle={false}
      search={false}
      options={false}
      request={async (params, sorter, filter) => {
		
		const res = await getDeiwu({code: code})
		return {
		   data: res.data,
		   success: true,
		}
      }}
      pagination={false}
    />
  );
};
export default () => {
  return (
    <ProTable
      columns={columns}
      request={(params, sorter, filter) => {
        return Promise.resolve({
          data: list,
          success: true,
        });
      }}
      rowKey="skuId"
      pagination={{
        showQuickJumper: true,
      }}
      expandable={{ expandedRowRender }}
      search={false}
      dateFormatter="string"
      headerTitle="嵌套表格"
      options={false}
    />
  );
};