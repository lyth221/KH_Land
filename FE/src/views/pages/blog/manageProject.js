// ** React Imports
import { Link, useHistory } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import React from "react";
// ** Third Party Components
import axios from "axios";
import classnames from "classnames";
import Select from "react-select";
import { Edit, Info, MessageSquare, PenTool } from "react-feather";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form } from "reactstrap";
import { selectThemeColors } from "@utils";

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
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import LoadingSweet from "./edit/LoadingSweet";
import SweetAlert from "react-bootstrap-sweetalert";
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
  const [blogCategories, setBlogCategories] = useState([]);
  const [alert, setAlert] = useState(null);

  const history = useHistory();

  const hideAlert = () => {
    setAlert(null);
  };

  const handleLoading = () => {
    setAlert(<LoadingSweet />);
  };

  const handleSuccess = () => {
    history.push("/pages/blog/manageProject");

    hideAlert();
    window.location.reload();
  };

  const categories = [
    { value: "pending", label: "Tạm dừng" },
    { value: "on_sale", label: "Đang mở bán" },
    { value: "is_coming", label: "Sắp mở bán" },
  ];

  const handleCreateProject = () => {
    handleLoading();
    const statusProject = blogCategories.values;
    let data = {
      name: projectName,
      projectCode: projectCode,
      description: description,
      location: location,
      urlLandingPage: landingPageUrl,
      status: statusProject,
    };
    axios
      .post("https://kimhongbds.com" + "/api/v1/project", data)
      .then((res) => {
        console.log("result", res);
        setAlert(
          <SweetAlert
            success
            onConfirm={handleSuccess}
            showCancel={false}
            title="Create project successfull!"
          />
        );
      })
      .catch((err) => {
        console.log(err);
        setAlert(
          <SweetAlert
            error
            onConfirm={hideAlert}
            showCancel={false}
            title="Create project failure!"
          />
        );
      });
  };
  const handleUpdateStatus = (e, value) => {
    e.preventDefault();
    axios
      .put("https://kimhongbds.com" + `/api/v1/contact-form/${value}`)
      .then((res) => {
        if (res.data.success == "successful") {
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    axios
      .get(
        "https://kimhongbds.com" +
          `/api/v1/project/list?page=${page}&&size=${size}`
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
        accessor: "name",
        sortable: false,
      },
      {
        Header: "Description",
        accessor: "description",
        filterable: false,
      },
      {
        Header: "Location",
        accessor: "location",
        filterable: false,
      },
      {
        Header: "Landing Page",
        accessor: "urlLandingPage",
        filterable: false,
      },
      {
        Header: "Actions",
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

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Manage Project"
        breadCrumbParent="Project"
        breadCrumbActive="Manage"
      />
      <Row>
        {alert}
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
                      value={projectCode}
                      onChange={(e) => setProjectCode(e.target.value)}
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
                  <Col md="6">
                    <Label className="form-label" for="blog-edit-title">
                      Status
                    </Label>
                    <Select
                      id="blog-edit-category"
                      isClearable={false}
                      theme={selectThemeColors}
                      value={blogCategories}
                      name="colors"
                      options={categories}
                      className="react-select"
                      classNamePrefix="select"
                      onChange={(data) => setBlogCategories(data)}
                    />
                  </Col>
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
