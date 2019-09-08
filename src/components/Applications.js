import React, { Component } from "react";

var appThumbnailStyle = {
  height: "200px"
};

class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visibility,
      gatheredDbDocs: {
        data: []
      }
    };
  }

  componentDidUpdate() {
    //Allows state to change when prop is updated by parent
    let x = this.props.visibility;
    if (x !== this.state.visible) {
      this.setState({ visible: x });
    }
    this.handleSearch();
  }

  componentWillMount() {
    this.handleSearch();
  }

  componentDidMount() {
    let x = this.props.visibility;
    if (x !== this.state.visible) {
      this.setState({ visible: x });
    }
  }

  handleSearch = user => {
    let url = "/hit-db";
    fetch(url)
      .then(response => response.json())
      .then(results => {
        console.log(results);
        console.log(results.length);
        this.setState({
          gatheredDbDocs: results
        });
      });
  };

  drawCards = argObj => (
    <div className="col-xl-4 col-md-6">
      <div className="card shadow mb-3">
        <h5 className="p-3">{argObj.title}</h5>
        <img src={argObj.imagePath} style={appThumbnailStyle} />
        <div className="card-footer text-right">
          <a href={argObj.githubLink}>
            <i class="fab fa-github"></i>
          </a>
          <span> | </span>
          <a href={argObj.deployedLink}>
            <i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
    </div>
  );

  render() {
    if (this.state.visible) {
      if (this.state.gatheredDbDocs.data.length !== 0) {
        var items = this.state.gatheredDbDocs.data;
        return (
          /////////////////////////////////////////////////////////////////////////////////
          /////////////////////////////////////////////////////////////////////////////////
          <section class="card mb-4">
            <subsection>
              <div className="card-header text-right"></div>
              <div className="card-body">
                <div className="row">{items.map(this.drawCards)}</div>
              </div>
            </subsection>
          </section>
          /////////////////////////////////////////////////////////////////////////////////
          /////////////////////////////////////////////////////////////////////////////////
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

export default Applications;
