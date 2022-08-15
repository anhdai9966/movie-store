class HashRoutes {
// tạo routes của từng file page
	_routes = {
		404: "/pages/404.html",
		"/": "/src/index.html",
		"/home": "/src/html/pages/home.html",
		"/movie": "/src/html/pages/movies.html",
	};

	constructor() {
		this._locationHandler();
		this.addHandlerLoaction();
	}

	// nhận sự thay đổi trên thanh trình duyệt
	_locationHandler() {
		let location = window.location.hash.replace("#", "");

		if (location.length == 0) {
			location = "/";
		}

		const route = this._routes[location] || this._routes["404"];
    console.log('🚀 ~ HashRoutes ~ _locationHandler ~ route', route)
		
		// window.location.assign(route);
	};

	addHandlerLoaction() {
		['load', 'hashchange'].forEach(ev => window.addEventListener(ev, this._locationHandler()));
	}
}

export default new HashRoutes();