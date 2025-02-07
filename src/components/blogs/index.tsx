import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button, Modal, Tabs, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "../../../src/assets/css/customStyles.css";
const Image1 = require('../../../src/assets/image/image_1.jpg');
const Image2 = require('../../../src/assets/image/image_2.jpg');

const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postsPerPage] = useState<number>(5);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // const randomUserId = Math.floor(Math.random() * 10) + 1;
                const randomUserId = 3;
                const response = await axios.get(process.env.REACT_APP_API_URL + `/users/${randomUserId}/posts`);
                setPosts(response.data);
            } catch (err) {
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleOk = async () => {
        setShowModal(false);
        if (selectedPostId !== null) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${selectedPostId}`);
                setPosts(posts.filter(post => post.id !== selectedPostId));
            } catch (err) {
                setError('Failed to delete post');
            }
        }
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const showDeleteModal = (postId: number) => {
        setSelectedPostId(postId);
        setShowModal(true);
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const allPosts = currentPosts.map((post, index) => (
        <Card style={{ marginBottom: '10px' }} key={index}>
            <Row gutter={24}>
                <Col span={4}>
                    <img src={(index + 1) % 2 === 0 ? Image1 : Image2} alt="Example" className='image-size' />
                </Col>
                <Col span={20}>
                    <h4>{post.title}</h4>
                    <p>{post.body}</p>
                    <a href="#" className='read-more'>
                        Read More
                    </a>
                    <div className='btn-left'>
                        <Link to={`/edit-blog/${post.id}`}>
                            <Button type="text" icon={<EditOutlined />} title="Edit Post" />
                        </Link>
                        <Button type="text" danger onClick={() => showDeleteModal(post.id)} title="Delete Post">
                            <DeleteOutlined />
                        </Button>
                    </div>
                </Col>
            </Row>
        </Card>
    ));

    const latestPosts = posts.slice(0, 5).map((post, index) => (
        <Card style={{ marginBottom: '10px' }} key={index}>
            <Row gutter={24}>
                <Col span={4}>
                    <img src={(index + 1) % 2 === 0 ? Image1 : Image2} alt="Example" className='image-size' />
                </Col>
                <Col span={20}>
                    <h4>{post.title}</h4>
                    <p>{post.body}</p>
                    <a href="#" className='read-more'>
                        Read More
                    </a>
                    <div className='btn-left'>
                        <Link to={`/edit-blog/${post.id}`}>
                            <Button type="text" icon={<EditOutlined />} title="Edit Post" />
                        </Link>
                        <Button type="text" danger onClick={() => showDeleteModal(post.id)} title="Delete Post">
                            <DeleteOutlined />
                        </Button>
                    </div>
                </Col>
            </Row>
        </Card>
    ));

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            {/* <h3>BLOG</h3> */}
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="ALL POSTS" key="1">
                    {allPosts}
                        <Pagination
                            current={currentPage}
                            pageSize={postsPerPage}
                            total={posts.length}
                            onChange={handlePageChange}
                            className='pagination-btn'
                        />
                </Tabs.TabPane>
                <Tabs.TabPane tab="LATEST POSTS" key="2">
                    {latestPosts}
                </Tabs.TabPane>
                <Tabs.TabPane tab="ARCHIVED" key="3" disabled>
                    {latestPosts}
                </Tabs.TabPane>
            </Tabs>
            <Modal open={showModal} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <h4>Confirm Deletion</h4>
                    <p>Are you sure you want to delete this post?</p>
                </div>
            </Modal>
        </div>
    );
};

export default BlogPage;