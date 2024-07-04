import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import {  DataGrid,GridColDef } from '@mui/x-data-grid';

// Define TypeScript interface for Post
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const PostsTable: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID',flex:1, width: 85},
        { field: 'title', headerName: 'Title',flex:2, width: 180,},
        { field: 'body', headerName: 'Body',flex:3, width: 400,},  
        { field: 'userId', headerName: 'User ID',flex:1, width: 120,},
    ];

    return (
        <> 
            <div style={{ height: '500px', width: '100%' ,marginBottom:"100px"}} >
            <Typography variant="h2" fontWeight="bold" fontSize="30px" marginBottom="20px" paddingTop="20px" textAlign="center">
               Posts Component 1
            </Typography>
                <DataGrid
                    rows={posts}
                    columns={columns}
                    sx={{
                        boxShadow: 2,
                        border: 0,
                        padding:"10px",
                        '& .MuiDataGrid-root,& .MuiDataGrid-footerContainer *,& .MuiDataGrid-row *,& .MuiDataGrid-footerContainer': {
                            color: 'white',
                        },
                        '--DataGrid-overlayHeight': '300px',
                    }}
                />
            </div>
        </>
    );
};

export default PostsTable;
