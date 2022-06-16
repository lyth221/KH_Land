// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import axios from "axios";
import classnames from "classnames";
import {
  Share2,
  GitHub,
  Gitlab,
  Twitter,
  Bookmark,
  Facebook,
  Linkedin,
  CornerUpLeft,
  MessageSquare,
} from "react-feather";

// ** Utils
import { kFormatter } from "@utils";

// ** Custom Components
import Sidebar from "../BlogSidebar";
import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Badge,
  Input,
  Label,
  Button,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/page-blog.scss";

// ** Images
import cmtImg from "@src/assets/images/portrait/small/avatar-s-6.jpg";
import { useHistory } from "react-router-dom";

const BlogDetails = () => {
  // ** States
  const [data, setData] = useState(null);

  const history = useHistory();

  useEffect(() => {
    // axios.get('/blog/list/data/detail').then(res => setData(res.data))
    console.log(history);
    let string_url = history.location.pathname;

    let array = string_url.split("/");
    let id = array[array.length - 1];

    axios.get("https://kimhongbds.com" + "/api/v1/news/" + id).then((res) => {
      setData(res.data.result);
    });
  }, []);

  const badgeColorsArr = {
    Quote: "light-info",
    Fashion: "light-primary",
    Gaming: "light-danger",
    Video: "light-warning",
    Food: "light-success",
  };

  const renderTags = () => {
    // return data.tags.map((tag, index) => {
    //   return (
    //     <a key={index} href='/' onClick={e => e.preventDefault()}>
    //       <Badge
    //         className={classnames({
    //           'me-50': index !== data.blog.tags.length - 1
    //         })}
    //         color={badgeColorsArr[tag]}
    //         pill
    //       >
    //         {tag}
    //       </Badge>
    //     </a>
    //   )
    // })
  };

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Blog Details"
        breadCrumbParent="Pages"
        breadCrumbParent2="Blog"
        breadCrumbActive="Details"
      />
      <div className="blog-wrapper">
        <div className="content-detached ">
          <div className="content-body">
            {data !== null ? (
              <Row>
                <Col sm="12">
                  <Card className="mb-3">
                    <CardImg
                      src={data.imageThumbnail}
                      className="img-fluid"
                      top
                    />
                    <CardBody>
                      <CardTitle tag="h4">{data.title}</CardTitle>
                      <div className="d-flex">
                        <Avatar
                          className="me-50"
                          img={data.avatar}
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
                              {data.owner}
                            </a>
                          </small>
                          <span className="text-muted ms-50 me-25">|</span>
                          <small className="text-muted">{data.createdAt}</small>
                        </div>
                      </div>
                      <div className="my-1 py-25">{renderTags()}</div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data.content,
                        }}
                      ></div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogDetails;
