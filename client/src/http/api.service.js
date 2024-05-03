export class ApiService {
	#apiPath = 'http://localhost:5000/api'//приватное поле #

	#makeRequest(url, options) {
		return fetch(this.#apiPath + url, options).then(res => res.json())//fetch js отправка запроса
	}

	get(url) {
		return this.#makeRequest(url, { 
			method: 'GET' 
		})
	}

	delete(url) {
		return this.#makeRequest(url, { method: 'DELETE' })
	}

	post(url, data) {//объединён метод удаления и обновления
		return this.#makeRequest(url, {
			headers: {//указывается что именно json
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			method: 'POST'
		})
	}
}
