import React, { Component } from "react";
import axios from "axios";

export class movie extends Component {

  state = {
    movieInput: "",
    movieList: [],
    isToggle: false,
    updatedInput: "",
  };

  handleMovieInputOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleMovieSubmit = async () => {
    try {
      let createdMovie = await axios.post(
        "http://localhost:3001/movie/create-movie-list",
        { movie: this.state.movieInput }
      );

      let newMovieArrayList = [
        ...this.state.movieList,
        createdMovie.data.data,
      ];

      this.setState({
        movieList: newMovieArrayList,
      });
    } catch (e) {
      console.log(e);
    }
  };

	render() {
		return (
			<div style={{ marginTop: 20, textAlign: "center" }}>
				<div style={{ marginTop: 20 }}>
					<input
						type="text"
						name="movieInput"
						value={this.state.movieInput}
						onChange={this.handleMovieInputOnChange}
					/>
        </div>
        <br />
        <button style={{ marginBottom: 10 }} onClick={this.handleMovieSubmit}>
          Submit
        </button>

        <br />
			</div>
		);
	}
}

export default movie;
