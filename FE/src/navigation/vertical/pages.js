// ** Icons Import
import { Circle, FileText, Square, UserCheck } from "react-feather";

export default [
  {
    id: "blog",
    title: "Dashboard",
    icon: <Circle size={12} />,
    children: [
      {
        id: "blogList",
        title: "List News",
        permissions: ["admin", "editor"],
        navLink: "/admin/pages/blog/list",
      },
      // {
      //   id: 'blogDetail',
      //   title: 'Detail',
      //   permissions: ['admin', 'editor'],
      //   navLink: '/pages/blog/detail'
      // },
      {
        id: "blogEdit",
        title: "Post News",
        permissions: ["admin", "editor"],
        navLink: "/admin/pages/blog/create",
      },
      {
        id: "blogEdit",
        title: "List Messages",
        permissions: ["admin", "editor"],
        navLink: "/admin/pages/blog/contactForm",
      },
      {
        id: "manageProject",
        title: "Mange Project",
        permissions: ["admin", "editor"],
        navLink: "/admin/pages/blog/manageProject",
      },
    ],
  },
];
