import { Card, Col, Row, ConfigProvider, theme, Layout } from 'antd';
import React, { useState, useEffect } from 'react';
import Index from './index';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const items: MenuProps['items'] = [
  {
    label: '视频评论',
    key: '/douyinContentComment',
  },
  {
    label: 'Navigation Two',
    key: 'app',
  }];
const { Header } = Layout;
const { Meta } = Card;

const Strategy: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Index />
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} >
          <Menu mode="horizontal" items={items} />
        </Header>
      </Layout>
    </Layout>
  )
};

export default Strategy;