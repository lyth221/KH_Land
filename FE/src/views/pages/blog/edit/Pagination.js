import React from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { withTranslation } from "react-i18next";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledButtonDropdown,
} from "reactstrap";
import "./Pagination.css";

const defaultButton = (props) => <button {...props}>{props.children}</button>;

class Pagination extends React.Component {
  constructor(props) {
    super();
    this.t = props.t;
    this.changePage = this.changePage.bind(this);

    this.state = {
      visiblePages: this.getVisiblePages(null, props.pages),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pages !== nextProps.pages) {
      this.setState({
        visiblePages: this.getVisiblePages(null, nextProps.pages),
      });
    }
    this.changePage(nextProps.page + 1);
  }

  filterPages = (visiblePages, totalPages) => {
    return visiblePages.filter((page) => page <= totalPages);
  };

  getVisiblePages = (page, total) => {
    if (total < 7) {
      return this.filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, page - 1, page, page + 1, total];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, total];
      }
    }
  };

  changePage(page) {
    const activePage = this.props.page + 1;

    if (page === activePage) {
      return;
    }

    const visiblePages = this.getVisiblePages(page, this.props.pages);

    this.setState({
      visiblePages: this.filterPages(visiblePages, this.props.pages),
    });

    this.props.onPageChange(page - 1);
  }

  render() {
    const { PageButtonComponent = defaultButton } = this.props;
    const { visiblePages } = this.state;
    const activePage = this.props.page + 1;
    return (
      <div className="Table__pagination">
        <div className="divider"></div>
        <Row className="w-100">
          <Col xs={12} md={4} className="pl-0">
            {this.props.showPageSizeOptions && (
              <div className="d-flex align-items-center">
                <span className="font-weight-bold">{"Rows"}: </span>
                <UncontrolledButtonDropdown size="sm" className="dropdown-page">
                  <DropdownToggle
                    size="sm"
                    color="transparent"
                    className="font-weight-bold"
                    caret
                  >
                    {this.props.pageSize}
                  </DropdownToggle>
                  <DropdownMenu>
                    {this.props.pageSizeOptions.map((option, i) => (
                      <div key={i}>
                        <div role="menuitem">
                          <a
                            className="dropdown-item"
                            onClick={() =>
                              this.props.onPageSizeChange(Number(option))
                            }
                          >
                            {option}
                          </a>
                        </div>
                        {i < this.props.pageSizeOptions.length - 1 && (
                          <DropdownItem divider />
                        )}
                      </div>
                    ))}
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
            )}
          </Col>
          <Col
            xs={12}
            md={8}
            className="d-flex flex-row justify-content-end px-0"
          >
            <div className="Table__prevPageWrapper">
              <PageButtonComponent
                className="Table__pageButton"
                onClick={() => {
                  if (activePage === 1) return;
                  this.changePage(activePage - 1);
                }}
                disabled={activePage === 1}
              >
                <ChevronLeft size={18} />
              </PageButtonComponent>
            </div>
            <div className="Table__visiblePagesWrapper">
              {visiblePages.map((page, index, array) => {
                return (
                  <PageButtonComponent
                    key={page}
                    className={
                      activePage === page
                        ? "Table__pageButton Table__pageButton--active"
                        : "Table__pageButton"
                    }
                    onClick={this.changePage.bind(null, page)}
                  >
                    {array[index - 1] + 2 < page ? `...${page}` : page}
                  </PageButtonComponent>
                );
              })}
            </div>
            <div className="Table__nextPageWrapper">
              <PageButtonComponent
                className="Table__pageButton"
                onClick={() => {
                  if (activePage === this.props.pages) return;
                  this.changePage(activePage + 1);
                }}
                disabled={activePage === this.props.pages}
              >
                <ChevronRight size={18} />
              </PageButtonComponent>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default withTranslation("common")(Pagination);
