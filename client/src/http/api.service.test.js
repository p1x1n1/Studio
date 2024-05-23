import { ApiService } from "./api.service";

describe("ApiService", () => {
  let apiService;

  beforeEach(() => {//перед каждым тестом создаём apiService
    apiService = new ApiService();
  });

  it("get метод выполнил GET запрос возвращающий объект json", async () => {
    const mockResponse = {
		id_record: 1,
		title: 'Ирис',
		cnt: 11,
		price: '70.00',
		img: 'ad62d71f-6035-492a-9a08-b7fafc55ebee.jpg'
	   };
    global.fetch = jest.fn().mockResolvedValueOnce(// Мокинг (имитации) модулей 
      new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const response = await apiService.get("/flower");

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/api/flower",
      { method: "GET" }
    );
    expect(response).toEqual(mockResponse);//проверяем рекурсивно объекты
  });

  it("getFile метод выполнил GET запрос и вернул blob объект", async () => {
    const mockResponse = new Blob();
    global.fetch = jest.fn().mockResolvedValueOnce(
      new Response(mockResponse, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );
    const response = await apiService.getFile("/flower");
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/api/flower",
      { method: "GET" }
    );
    expect(response).toEqual(mockResponse);
  });

  it("delete метод выполнил запрос DELETE", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce(
		new Response(JSON.stringify({success:true}), 
		{ status: 200 })
	);

    await apiService.delete("/flower");

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/api/flower",
      { method: "DELETE" }
    );
  });

  it("post метод выполнил POST запрос с json объектом", async () => {
    const mockResponse = {
		id_record: 6,
		title: 'Монобукеты'
	  };
    global.fetch = jest.fn().mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const data = {
      id_record: 6,
      title: 'Монобукеты'};

    const response = await apiService.post("/category", data);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/api/category",
      {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        method: "POST",
      }
    );

    expect(response).toEqual(mockResponse);
  });

  it("postformData метод выполнил POST запрос с FormData объектом", async () => {
	const mockResponse = {
		id_record: 6,
		title: 'Роза',
		cnt: 25,
		price: '80.00',
		img: 'd12ecc48-7529-443c-a1bb-08e98287257e.jpg'
	  };
    global.fetch = jest.fn().mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const formData = new FormData();

    const response = await apiService.postformData("/flower", formData);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/api/flower",
      {
        body: formData,
        method: "POST",
      }
    );

    expect(response).toEqual(mockResponse);
  });
});

