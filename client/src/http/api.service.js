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
	getFile(url){
		return fetch(this.#apiPath + url,{ 
		  method: 'GET' 
		}).then(response => {
		  if (response.ok) {
			return response.blob();
		  } else {
			throw new Error('Error getting file: ' + response.statusText);
		  }
		});
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
	postformData(url, formData) {
		return this.#makeRequest(url, {
		  body: formData,
		  method: 'POST'
		});
	  }
	  
}
