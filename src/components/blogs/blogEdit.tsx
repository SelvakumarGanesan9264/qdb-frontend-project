import React, { useState, useEffect } from 'react';
import { Form, Input, message, Button, Card } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../../src/assets/css/customStyles.css";
const Image1 = require('../../../src/assets/image/image_1.jpg');
const BlogEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            try {
                const response = await axios.get(process.env.REACT_APP_API_URL+`/posts/${id}`);
                form.setFieldsValue(response.data);
            } catch (error) {
                message.error('Failed to fetch blog data');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id, form]);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await axios.put(process.env.REACT_APP_API_URL+`/posts/${id}`, values);
            message.success('Blog updated successfully');
            navigate('/blogs'); 
        } catch (error) {
            message.error('Failed to update blog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
             <h3>EDIT BLOG</h3>
            <Card>
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item>
                        <Input.Group compact>
                            <img src={Image1} alt="Example" />
                            <Form.Item name="userId" label="User ID" rules={[{ required: true, message: 'Please input the user ID!' }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: '16px' }}>
                                <Input disabled />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="body" label="Body" rules={[{ required: true, message: 'Please input the body!' }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item className='btn-right' style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                        <Button type="default" onClick={() => navigate('/blogs')} style={{ marginLeft: '8px' }}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default BlogEdit;