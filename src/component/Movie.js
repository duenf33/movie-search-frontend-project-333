import React, { Component } from "react";
import axios from "axios";

export class movie extends Component {
	state = {
		movieInput: "",
		movieList: [],
		isToggle: false,
		updatedInput: "",
	};

	componentDidMount = async () => {
		try {
			let allMovie = await axios.get(
				"http://localhost:3001/movie/get-movie-list"
			);

			this.setState({
				movieList: allMovie.data.data,
			});
		} catch (e) {
			console.log(e);
		}
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

			let newMovieArrayList = [...this.state.movieList, createdMovie.data.data];

			this.setState({
				movieList: newMovieArrayList,
			});
		} catch (e) {
			console.log(e);
		}
	};

	handleDeleteByParamsID = async (id) => {
		try {
			let deletedMovie = await axios.delete(
				`http://localhost:3001/movie/delete-by-id-v2/${id}`
			);

			let newDeletedMovieArrayList = this.state.movieList.filter(
				(item) => item._id !== deletedMovie.data.data._id
			);

			this.setState({
				movieList: newDeletedMovieArrayList,
			});
		} catch (e) {
			console.log(e);
		}
	};

	updateOnChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleUpdateByID = async (movie) => {
		this.setState((prevState) => {
			return {
				isToggle: !prevState.isToggle,
				updatedInput: movie.movie,
			};
		});

		try {
			let updatedMovie = await axios.put(
				`http://localhost:3001/movie/update-by-id-v1/${movie._id}`,
				{
					movie: this.state.updatedInput,
				}
			);

			let updatedMovieListArray = this.state.movieList.map((item) => {
				if (item._id === updatedMovie.data.data._id) {
					item.movie = updatedMovie.data.data.movie;
				}

				return item;
			});

			this.setState({
				movieList: updatedMovieListArray,
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

				{this.state.movieList.map((item) => {
					return (
						<div key={item._id}>
							{this.state.isToggle ? (
								<input
									type="text"
									name="updatedInput"
									value={this.state.updatedInput}
									onChange={this.updateOnChange}
								/>
							) : (
								<span style={{ margin: "10px" }}>{item.movie}</span>
							)}

							<button
								onClick={() => this.handleUpdateByID(item)}
								style={{ margin: "10px" }}
								className="btn btn-primary"
							>
								Update
							</button>

							<button
								onClick={() => this.handleDeleteByParamsID(item._id)}
								style={{ margin: "10px" }}
								className="btn btn-warning"
							>
								Delete
							</button>
						</div>
					);
				})}
			</div>
		);
	}
}

export default movie;
