'use client';

import React from 'react';
import { Row, Col, Card, Typography, Button } from 'antd';

// Simple container wrapper
export const SDUIContainer = ({ children, className, style }: any) => (
    <div className={className} style={style}>
        {children}
    </div>
);

export const SDUIRow = ({ children, gutter }: any) => (
    <Row gutter={gutter}>{children}</Row>
);

export const SDUICol = ({ children, span, xs, sm, md, lg, xl }: any) => (
    <Col span={span} xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
        {children}
    </Col>
);

export const SDUICard = ({ children, title, bordered = false }: any) => (
    <Card title={title} bordered={bordered}>
        {children}
    </Card>
);

export const SDUIText = ({ content, type, level, strong }: any) => {
    if (level) {
        return <Typography.Title level={level}>{content}</Typography.Title>;
    }
    return (
        <Typography.Text type={type} strong={strong}>
            {content}
        </Typography.Text>
    );
};

export const SDUIButton = ({ children, type, danger, onClick }: any) => (
    <Button type={type} danger={danger} onClick={onClick}>
        {children}
    </Button>
);
