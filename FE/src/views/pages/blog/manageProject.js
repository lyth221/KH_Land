// ** React Imports
import { Link, useHistory } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import React from "react";
// ** Third Party Components
import axios from "axios";
import classnames from "classnames";
import { Edit, Info, MessageSquare, PenTool } from "react-feather";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form } from "reactstrap";

// ** Custom Components
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
  Label,
  Button,
  Input,
  Editor,
} from "reactstrap";
import Pagination from "./edit/Pagination";
// ** Styles
import "@styles/base/pages/page-blog.scss";
import "./table.css";
const ManageProject = () => {
  // ** States
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [size, setSize] = useState(5);
  const [totalPage, setTotal] = useState(0);

  const [dataMessages, setDataMessages] = useState({});
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [landingPageUrl, setLandingPageURL] = useState("");

  const history = useHistory();

  const handleDetail = (id) => {
    history.push("/pages/blog/detail/" + id);
  };

  const handleEdit = (id) => {
    history.push("/pages/blog/edit/" + id);
  };

  const handleCreateProject = (data) => {};
  const handleUpdateStatus = (e, value) => {
    e.preventDefault();
    axios
      .put("http://localhost:8080" + `/api/v1/contact-form/${value}`)
      .then((res) => {
        console.log("res", res.data);
        if (res.data.success == "successful") {
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080" +
          `/api/v1/contact-form/list?page=${page}&&size=${size}`
      )
      .then((res) => {
        console.log("res data", res.data.result);
        let temp = res.data.result.result.map((item, idx) => {
          return {
            id: idx + 1,
            ...item,
            actions: (
              <div className="d-flex">
                <Button color="success" onClick={() => isOpenModal(item)}>
                  <Info size={18} />
                </Button>
                {/* <Button
                  color="info"
                  className="mx-2"
                  onClick={() => handleEdit(item.newsId)}
                >
                  <Edit size={18} />
                </Button> */}
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
            Project Name
          </div>
        ),
        accessor: "customerName",
        sortable: false,
      },
      {
        Header: "Description",
        accessor: "email",
        filterable: false,
      },
      {
        Header: "Image",
        accessor: "phoneNumber",
        filterable: false,
      },
      {
        Header: "Location",
        accessor: "message",
        filterable: false,
      },
      {
        Header: "Note",
        accessor: "actions",
        width: 80,
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

  const isOpenModal = (data) => {
    setDataMessages(data);
    setOpenModal(true);
  };
  const isCloseModal = () => {
    setOpenModal(false);
  };
  const handleCreatePost = () => {};

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
        breadCrumbTitle="Manage Project"
        breadCrumbParent="Project"
        breadCrumbActive="Manage"
      />
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <Form className="mt-2" onSubmit={(e) => e.preventDefault()}>
                <Row>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="blog-edit-title">
                      Project Name
                    </Label>
                    <Input
                      id="blog-edit-title"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </Col>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="blog-edit-title">
                      ProjectCode
                    </Label>
                    <Input
                      id="blog-edit-title"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </Col>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="blog-edit-title">
                      Location
                    </Label>
                    <Input
                      id="blog-edit-title"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </Col>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="blog-edit-title">
                      Description
                    </Label>
                    <Input
                      id="blog-edit-title"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Col>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="blog-edit-title">
                      Landing Page URL
                    </Label>
                    <Input
                      id="blog-edit-title"
                      value={landingPageUrl}
                      onChange={(e) => setLandingPageURL(e.target.value)}
                    />
                  </Col>
                  <Col md="6"></Col>
                  <Col className="mt-50">
                    <Button
                      color="primary"
                      className="me-1"
                      onClick={handleCreateProject}
                    >
                      Add Project
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <div className="blog-wrapper">
        <div className="content-detached">
          <div className="content-body">
            <div className="blog-list-wrapper">
              <Card className="p-1">
                <ReactTable
                  noDataText={"No Messages"}
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
        <div>
          <Modal toggle={function noRefCheck() {}} isOpen={openModal}>
            <ModalHeader toggle={isCloseModal}>Message Details</ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col-md-4">
                  <p>Customer Name:</p>
                  <p>Email:</p>
                  <p>Phone Number:</p>
                </div>
                <div className="col-md-8">
                  <p>{dataMessages.customerName}</p>
                  <p>{dataMessages.email}</p>
                  <p>{dataMessages.phoneNumber}</p>
                </div>
                <hr></hr>
                <div className="col-md-12">{dataMessages.message}</div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={(e) => {
                  handleUpdateStatus(e, dataMessages._id);
                }}
              >
                Solved
              </Button>{" "}
              <Button onClick={isCloseModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </Fragment>
  );
};

export default ManageProject;
