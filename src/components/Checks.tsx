import React, { useState, useEffect } from 'react';
import { Checkbox, List, ListItem, ListItemIcon, ListItemText, Collapse, Typography } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

interface Department {
    department: string;
     sub_departments: string[];
}

const departmentsData: Department[] = [
    {
        department: 'customer service',
         sub_departments: ['support', 'customer success'],
    },
    {
        department: 'design',
         sub_departments: ['graphic design', 'product design', 'web design'],
    },
    {
        department: 'development',
         sub_departments: ['frontend', 'backend', 'fullstack'],
    },
    {
        department: 'marketing',
         sub_departments: ['seo', 'content', 'social media'],
    },
    {
        department: 'hr',
         sub_departments: ['recruitment', 'employee relations'],
    },
    {
        department: 'sales',
         sub_departments: ['inside sales', 'field sales', 'sales operations'],
    },
    {
        department: 'finance',
         sub_departments: ['accounting', 'budgeting', 'payroll'],
    },
    {
        department: 'legal',
         sub_departments: ['compliance', 'corporate', 'litigation'],
    },
    {
        department: 'it',
         sub_departments: ['network', 'infrastructure', 'help desk'],
    },
    {
        department: 'administration',
         sub_departments: ['office management', 'executive assistant'],
    },
    {
        department: 'research',
         sub_departments: ['market research', 'product research', 'scientific research'],
    },
    {
        department: 'operations',
         sub_departments: ['logistics', 'supply chain', 'procurement'],
    },
    {
        department: 'training',
         sub_departments: ['employee training', 'management training'],
    },
    {
        department: 'security',
         sub_departments: ['physical security', 'cyber security'],
    },
    {
        department: 'public relations',
         sub_departments: ['media relations', 'crisis management'],
    },
    {
        department: 'product management',
         sub_departments: ['product planning', 'product development'],
    },
    {
        department: 'strategy',
         sub_departments: ['business strategy', 'corporate strategy'],
    },
    {
        department: 'quality assurance',
         sub_departments: ['product testing', 'process improvement'],
    },
    {
        department: 'analytics',
         sub_departments: ['data analysis', 'business intelligence'],
    },
    {
        department: 'customer experience',
         sub_departments: ['customer journey', 'customer feedback'],
    },
];


const DepartmentList: React.FC = () => {
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
    const [openDepartments, setOpenDepartments] = useState<{ [key: string]: boolean }>({});
    useEffect(() => {
        const initialChecked: { [key: string]: boolean } = {};
        departmentsData.forEach((dept) => {
            initialChecked[dept.department] = false;
            dept. sub_departments.forEach((subDept) => {
                initialChecked[subDept] = false;
            });
        });
        setCheckedItems(initialChecked);
        const initialOpen: { [key: string]: boolean } = {};
        departmentsData.forEach((dept) => {
            initialOpen[dept.department] = false;
        });
        setOpenDepartments(initialOpen);
    }, []);

    const handleToggleDepartment = (dept: string) => {
        const newCheckedItems = { ...checkedItems };
        const isDepartmentChecked = !checkedItems[dept];
        newCheckedItems[dept] = isDepartmentChecked;
        // Set the same state for all sub-departments
        departmentsData.find(d => d.department === dept)?.sub_departments.forEach((subDept) => {
            newCheckedItems[subDept] = isDepartmentChecked;
        });

        setCheckedItems(newCheckedItems);
    };

    const handleToggleSubDepartment = (subDept: string, parentDept: string) => {
        const newCheckedItems = { ...checkedItems };
        newCheckedItems[subDept] = !checkedItems[subDept];
        // Check if all sub-departments are selected
        const parentDepartment = departmentsData.find(d => d.department === parentDept);
        if (parentDepartment) {
            const allSubDepartmentsChecked = parentDepartment.sub_departments.every(sub => newCheckedItems[sub]);
            newCheckedItems[parentDept] = allSubDepartmentsChecked;
        }
        setCheckedItems(newCheckedItems);
    };

    const handleExpandDepartment = (dept: string) => {
        const newOpenDepartments = { ...openDepartments };
        newOpenDepartments[dept] = !newOpenDepartments[dept];
        setOpenDepartments(newOpenDepartments);
    };

    return (
        <div style={{ backgroundColor: '#121212', color: 'white', padding: '20px' }}>
            <Typography variant="h2" fontWeight="bold" fontSize="30px" marginBottom="20px" paddingTop="20px" textAlign="center">
            Department Selection Component 2
            </Typography>
            <List>
                {departmentsData.map((dept, index) => (
                    <div key={index} style={{ marginBottom: '10px', boxShadow: '0px 4px 10px rgba(0,0,0,0.3)', borderRadius: '5px', backgroundColor: '#1e1e1e' }}>
                        <ListItem 
                            onClick={() => {handleExpandDepartment(dept.department); }} 
                            style={{ paddingLeft: '16px', fontSize: '18px', fontWeight: 'bold', transition: 'all 0.3s ease-in-out', color: checkedItems[dept.department] ? '#4caf50' : 'white' }}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    onClick={(event) => { handleToggleDepartment(dept.department);event.stopPropagation()}} 
                                    checked={checkedItems[dept.department] || false}
                                    tabIndex={-1}
                                    disableRipple
                                    sx={{ color: 'white', '&.Mui-checked': { color: '#4caf50' } }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={dept.department} sx={{textTransform:"uppercase"}}/>
                            {openDepartments[dept.department] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openDepartments[dept.department]} timeout="auto" unmountOnExit>
                            <List disablePadding>
                                {dept. sub_departments.map((subDept, subIndex) => (
                                    <ListItem 
                                        key={subIndex} 
                                        onClick={() => handleToggleSubDepartment(subDept, dept.department)}
                                        style={{ paddingLeft: '32px', fontSize: '16px', color: checkedItems[subDept] ? '#4caf50' : 'white', transition: 'all 0.3s ease-in-out' }}
                                    >
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={checkedItems[subDept] || false}
                                                tabIndex={-1}
                                                disableRipple
                                                sx={{ color: 'white', '&.Mui-checked': { color: '#4caf50' } }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary={subDept} sx={{textTransform:"uppercase"}}/>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </div>
                ))}
            </List>
        </div>
    );
};

export default DepartmentList;
