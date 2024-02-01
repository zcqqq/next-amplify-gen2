import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Menubar } from 'primereact/menubar';
import NavHome from './index';

export default function Strategy() {
    const items = [
        {label: '视频策略',url: '/strategy/contentComment',},
        {label: '策略2',},
    ];

    return (
        <div style={{ display: 'flex' }}>
            <NavHome />
            <div style={{ width: '100vw', flexDirection: 'column' }}>
                <Menubar model={items} />
            </div>
        </div>
    )
}