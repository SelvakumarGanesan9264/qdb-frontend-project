import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import axios from 'axios';

interface User {
    name: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
    company: {
        name: string;
    };
    phone: string;
}

const Dashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/users`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    return (
        <div>
            <h3>DASHBOARD</h3>
            <Row gutter={24}>
            {users.map((user, index) => (
                <Col span={8} key={index}>
                <Card style={{ marginBottom: '10px', marginRight: '10px' }} key={index}>
                    <p><strong>Name :</strong> {user.name || 'N/A'}</p>
                    <p><strong>Email :</strong> {user.email || 'N/A'}</p>
                    <p><strong>Address :</strong></p>
                    <p>{user.address?.street || 'N/A'}</p>
                    <p>{user.address?.suite || 'N/A'}</p>
                    <p>{user.address?.city || 'N/A'}</p>
                    <p>{user.address?.zipcode || 'N/A'}</p>
                    <p><strong>Company :</strong> {user.company?.name || 'N/A'}</p>
                    <p><strong>Mobile :</strong> {user.phone || 'N/A'}</p>
                </Card>
                </Col>
            ))}
            </Row>
        </div>
    );
};

export default Dashboard;