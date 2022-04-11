// ** React Imports
import { Link, useHistory } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import React from "react";
// ** Third Party Components
import axios from "axios";
import classnames from "classnames";
import { Edit, Info, MessageSquare, PenTool } from "react-feather";

// ** Custom Components
import Sidebar from "../BlogSidebar";
import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  Badge,
  PaginationItem,
  PaginationLink,
  Button,
} from "reactstrap";
import Pagination from "../edit/Pagination";
// ** Styles
import "@styles/base/pages/page-blog.scss";
import "./table.css";
const BlogList = () => {
  // ** States
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalPage, setTotal] = useState(0);

  const history = useHistory();

  const handleDetail = (id) => {
    history.push("/pages/blog/detail/" + id);
  };

  const handleEdit = (id) => {
    history.push("/pages/blog/edit/" + id);
  };

  useEffect(() => {
    axios
      .get(
        "http://192.168.123.193:8080" + `/api/v1/news/list?page=${page}&&size=${size}`
      )
      .then((res) => {
        let temp = res.data.result.result.map((item, idx) => {
          return {
            id: idx,
            ...item,
            actions: (
              <div className="d-flex">
                <Button
                  color="success"
                  onClick={() => handleDetail(item.newsId)}
                >
                  <Info size={18} />
                </Button>
                <Button
                  color="info"
                  className="mx-2"
                  onClick={() => handleEdit(item.newsId)}
                >
                  <Edit size={18} />
                </Button>
              </div>
            ),
          };
        });
        setData(temp);
        setTotal(Math.round(res.data.result.total / size));
      });
  }, [page, size]);

  const columns = React.useMemo(
    () => [
      {
        Header: () => (
          <div
            style={{
              textAlign: "left",
            }}
          >
            ID
          </div>
        ),
        accessor: "id",
        sortable: false,
        width: 50,
      },
      {
        Header: () => (
          <div
            style={{
              textAlign: "left",
            }}
          >
            Title
          </div>
        ),
        accessor: "title",
        sortable: false,
      },
      {
        Header: "Sub title",
        accessor: "subTitle",
        filterable: false,
      },
      {
        Header: "Owner",
        accessor: "owner",
        filterable: false,
      },
      {
        Header: "Category",
        accessor: "category",
        filterable: false,
      },
      {
        Header: "Actions",
        accessor: "actions",
        width: 150,
        filterable: false,
      },
    ],
    []
  );

  const badgeColorsArr = {
    Quote: "light-info",
    Fashion: "light-primary",
    Gaming: "light-danger",
    Video: "light-warning",
    Food: "light-success",
  };

  const renderRenderList = () => {
    return data.map((item) => {
      const renderTags = () => {
        return item.tags.map((tag, index) => {
          return (
            <a key={index} href="/" onClick={(e) => e.preventDefault()}>
              <Badge
                className={classnames({
                  "me-50": index !== item.tags.length - 1,
                })}
                color={badgeColorsArr[tag]}
                pill
              >
                {tag}
              </Badge>
            </a>
          );
        });
      };

      return (
        <Col key={item.title} md="6">
          <Card>
            <Link to={`/pages/blog/detail/${item.id}`}>
              <CardImg
                className="img-fluid"
                src={item.img}
                alt={item.title}
                top
              />
            </Link>
            <CardBody>
              <CardTitle tag="h4">
                <Link
                  className="blog-title-truncate text-body-heading"
                  to={`/pages/blog/detail/${item.id}`}
                >
                  {item.title}
                </Link>
              </CardTitle>
              <div className="d-flex">
                <Avatar
                  className="me-50"
                  img={item.avatar}
                  imgHeight="24"
                  imgWidth="24"
                />
                <div>
                  <small className="text-muted me-25">by</small>
                  <small>
                    <a
                      className="text-body"
                      href="/"
                      onClick={(e) => e.preventDefault()}
                    >
                      {item.userFullName}
                    </a>
                  </small>
                  <span className="text-muted ms-50 me-25">|</span>
                  <small className="text-muted">{item.blogPosted}</small>
                </div>
              </div>
              <div className="my-1 py-25">{renderTags()}</div>
              <CardText className="blog-content-truncate">
                {item.excerpt}
              </CardText>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <Link to={`/pages/blog/detail/${item.id}`}>
                  <MessageSquare size={15} className="text-body me-50" />
                  <span className="text-body fw-bold">
                    {item.comment} Comments
                  </span>
                </Link>
                <Link className="fw-bold" to={`/pages/blog/detail/${item.id}`}>
                  Read More
                </Link>
              </div>
            </CardBody>
          </Card>
        </Col>
      );
    });
  };

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Blog List"
        breadCrumbParent="Blog"
        breadCrumbActive="List"
      />
      <div className="blog-wrapper">
        <div className="content-detached">
          <div className="content-body">
            <div className="blog-list-wrapper">
              <Card className="p-1">
                <ReactTable
                  noDataText={"No Post"}
                  data={data}
                  columns={columns}
                  previousText={"<"}
                  nextText={">"}
                  rowsText={"Row"}
                  ofText="/"
                  defaultPageSize={5}
                  pages={totalPage}
                  showPaginationBottom={true}
                  sortable={false}
                  resizable={true}
                  className="-striped -highlight"
                  PaginationComponent={Pagination}
                  manual
                  onFetchData={async (state, instance) => {
                    setPage(state.page + 1);
                    setSize(state.pageSize);
                  }}
                />
              </Card>
            </div>
          </div>
        </div>
        {/* <Sidebar /> */}
      </div>
    </Fragment>
  );
};

export default BlogList;
