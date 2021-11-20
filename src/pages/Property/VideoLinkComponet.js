import React, { Component } from 'react'

export default class VideoLinkComponet extends Component {

    state = {
        rows: [
           {
            source: 0,
            link: "",
            title:""
           } 
        ]
      };

      handleVideo = (item, e) => {
        e.preventDefault();
        let index = this.state.rows.indexOf(item)
        console.log("this is index   ",index)
        var mydata = this.state.rows
        var loopData = []
        var i;
        for (i = 0; i < mydata.length; i++) {
            if (i == index) {
                mydata[i].source = e.target.value

               
            }
        }
        this.setState({ rows: mydata })
        this.props.handleVideo(this.state.rows);

    };

    handleLink = (item, e) => {
        e.preventDefault();
        let index = this.state.rows.indexOf(item)
        var mydata = this.state.rows
        var loopData = []
        var i;
        for (i = 0; i < mydata.length; i++) {
         
            if (i == index) {
                mydata[i].link = e.target.value

               
            }
        }
        this.setState({ rows: mydata })
        this.props.handleVideo(this.state.rows);

    };

    handleTitle = (item, e) => {
        e.preventDefault();
        let index = this.state.rows.indexOf(item)
        var mydata = this.state.rows
        var loopData = []
        var i;
        for (i = 0; i < mydata.length; i++) {
            console.log("i", i)
            if (i == index) {
                mydata[i].title = e.target.value

               
            }
        }
        this.setState({ rows: mydata })
        this.props.handleVideo(this.state.rows);

    };

      handleChange = idx => e => {
          e.preventDefault();

        const { name, value } = e.target;
        const rows = [...this.state.rows];
        rows[idx] = {
          [name]: value
        };
        this.setState({
          rows
        });
      };
      handleAddRow = (e) => {
        e.preventDefault();
        const item = {
          source: "",
          link: "",
          title:""

        };
        this.setState({
          rows: [...this.state.rows, item]
        });
      };
      handleRemoveRow = (item, e) => {
                e.preventDefault();
        let index = this.state.rows.indexOf(item)
        var mydata = this.state.rows
        var loopData = []
        var i;
        for (i = 0; i < mydata.length; i++) {
            console.log("i", i)
            if (i == index) {
                //mydata[i].title = e.target.value

        this.setState({
          rows: this.state.rows.slice(mydata[i], -1)
        });

               
            }
        }

        // this.setState({
        //   rows: this.state.rows.slice(0, -1)
        // });
      };

    render() {
        return (
            <div>
                <table class="table" id="myTable">
                    <thead>
                        <tr>
                            <th>Video Source</th>
                            <th>Link</th>
                            <th>Title</th>
                            <th><button
                onClick={this.handleAddRow}
                className="btn btn-info" >
                Add Video
              </button></th>
                        </tr>
                    </thead>
       
                    <tbody>
          
                    {this.state.rows.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>
                      <select className="form-select" aria-label="Default select example"  value={this.state.rows[idx].source}
                          onChange={this.handleVideo.bind(this, item)}>
                                <option selected value="0">Video Source</option>
                                <option value="1">Youtube</option>
                                <option value="2">Vimeo</option>
                            </select>
                      </td>
                      <td>
                      <input aria-invalid="false" name="video-link" type="url" class="form-control" placeholder="Video Link"   value={this.state.rows[idx].link}
                          onChange={this.handleLink.bind(this, item)} />
                      </td>
                      <td>
                  
                            <input aria-invalid="false" name="video-link" type="url" class="form-control" placeholder="Video Title"   value={this.state.rows[idx].title}
                          onChange={this.handleTitle.bind(this, item)} />
                      </td>
                      <td>
                           
                           <a href="#"
               onClick={this.handleRemoveRow.bind(this, item)}
               className="btn btn-danger" >
              Delete
             </a>
                       </td>
                    </tr>
                  ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
