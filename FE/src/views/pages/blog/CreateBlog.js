// ** React Imports
import { useState, useEffect } from "react";

// ** Third Party Components
import axios from "axios";
import Select from "react-select";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";

// ** Custom Components
import Avatar from "@components/avatar";
import SweetAlert from "react-bootstrap-sweetalert";
import Breadcrumbs from "@components/breadcrumbs";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Form,
  Label,
  Input,
  Button,
  Spinner,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";
import LoadingSweet from "./edit/LoadingSweet";
import draftToHtml from "draftjs-to-html";
import { useHistory } from "react-router-dom";

const BlogCreate = () => {
  const initialContent = "";

  const history = useHistory();

  const contentBlock = htmlToDraft(initialContent);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  const editorState = EditorState.createWithContent(contentState);

  const [imageLink, setLink] = useState("");

  // ** States
  const [title, setTitle] = useState(""),
    [slug, setSlug] = useState(""),
    [status, setStatus] = useState(""),
    [content, setContent] = useState(editorState),
    [blogCategories, setBlogCategories] = useState([]),
    [alert, setAlert] = useState(null);

  const hideAlert = () => {
    setAlert(null);
  };

  const categories = [
    { value: "Tất cả dự án", label: "Tất cả dự án" },
    { value: "Phân tích thực tế", label: "Phân tích thực tế" },
    { value: "Mua bán", label: "Mua bán" },
    { value: "Thông tin bên lề", label: "Thông tin bên lề" },
  ];

  const handleLoading = () => {
    setAlert(<LoadingSweet />);
  };

  const handleSuccess = () => {
    history.push("/pages/blog/list");
  };

  const handleCreatePost = () => {
    handleLoading();
    console.log(content.getCurrentContent().getPlainText());
    let data = {
      title: title,
      subTitle: slug,
      content: draftToHtml(convertToRaw(content.getCurrentContent())),
      owner: "Admin- Kim Hồng",
      category: blogCategories?.value ? blogCategories.value : "Tất cả dự án",
      views: 0,
      active: status ? true : false,
      project: "Nam Thăng Long",
      imageThumbnail: imageLink ? imageLink : "",
    };
    axios
      .post("https://kimhongbds.com" + "/api/v1/news", data)
      .then((res) => {
        setAlert(
          <SweetAlert
            success
            onConfirm={handleSuccess}
            showCancel={false}
            title="Create post successfull!"
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
            title="Create post failure!"
          />
        );
      });
  };

  return (
    <div className="blog-edit-wrapper">
      {alert}
      <Breadcrumbs
        breadCrumbTitle="Blog Edit"
        breadCrumbParent="Blog"
        breadCrumbActive="Create"
      />
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <Form className="mt-2" onSubmit={(e) => e.preventDefault()}>
                <Row>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="blog-edit-title">
                      Title
                    </Label>
                    <Input
                      id="blog-edit-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Col>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="blog-edit-category">
                      Category
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
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="blog-edit-slug">
                      Sub title
                    </Label>
                    <Input
                      id="blog-edit-slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                  </Col>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="blog-edit-status">
                      Status
                    </Label>
                    <Input
                      type="select"
                      id="blog-edit-status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value={true}>Published</option>
                      <option value={false}>Pending</option>
                    </Input>
                  </Col>
                  <Col sm="12" className="mb-2">
                    <Label className="form-label">Content</Label>
                    <Editor
                      editorState={content}
                      onEditorStateChange={(data) => setContent(data)}
                    />
                  </Col>
                  <Col sm="12" className="mb-2">
                    <Label className="form-label">Image Banner</Label>
                    <Input
                      type="text"
                      id="blog-banner"
                      placeholder="Image link"
                      value={imageLink}
                      onChange={(e) => setLink(e.target.value)}
                    ></Input>
                  </Col>
                  <Col className="mt-50">
                    <Button
                      color="primary"
                      className="me-1"
                      onClick={handleCreatePost}
                    >
                      Create new post
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BlogCreate;
