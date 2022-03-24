// ** Icons Import
import { Circle, FileText, Square, UserCheck } from 'react-feather'

export default [
    
  {
    id: 'blog',
    title: 'Blog',
    icon: <Circle size={12} />,
    children: [
      {
        id: 'blogList',
        title: 'List',
        permissions: ['admin', 'editor'],
        navLink: '/pages/blog/list'
      },
      {
        id: 'blogDetail',
        title: 'Detail',
        permissions: ['admin', 'editor'],
        navLink: '/pages/blog/detail'
      },
      {
        id: 'blogEdit',
        title: 'Edit',
        permissions: ['admin', 'editor'],
        navLink: '/pages/blog/edit'
      }
    ]
  }
 
]
