import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../dashboard/index.tsx';
import Blogs from '../blogs/index.tsx';
import BlogEdit from '../blogs/blogEdit.tsx';

const AppRouter: React.FC = () => {
    return (
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/edit-blog/:id" element={<BlogEdit />} />
            </Routes>
    );
};
export default AppRouter;