import { Form, Button, Input, Table, Modal, Select, Segmented, Image, Row, Col, InputNumber, Tag, Upload, message } from 'antd'
import { ApiService } from '../http/api.service'
import { useEffect, useState } from 'react'
import {Form as ReactForm} from 'react-bootstrap';

const apiService = new ApiService()

const wrapper_columns = [
	{
		title: 'Артикул',
		dataIndex: 'id_record',
		key: 'id_record'
	},
	{
		title: 'Название',
		dataIndex: 'title',
		key: 'title'
	},
	{
		title: 'Категория',
		dataIndex: 'category_title',
		key: 'category_title'
	},
	{
		title: 'Стоимость за 1 шт.',
		dataIndex: 'price',
		key: 'price'
	},
	{
		title: 'Количество',
		dataIndex: 'cnt',
		key: 'cnt'
	},
	{
		title: 'Изображение',
		dataIndex: 'img',
		key: 'img'
	},
	{
		title: 'Изображение',
		dataIndex: 'img',
		key: 'img',
		render: (_,{img})=>(
			<img src={process.env.REACT_APP_API_URL + img} alt={img} width={100}/>
		)
	},
]
const category_columns = [
	{
		title: '№',
		dataIndex: 'id_record',
		key: 'id_record'
	},
	{
		title: 'Название',
		dataIndex: 'title',
		key: 'title'
	},
]
const flower_columns = [
	{
		title: 'Артикул',
		dataIndex: 'id_record',
		key: 'id_record'
	},
	{
		title: 'Название',
		dataIndex: 'title',
		key: 'title'
	},
	{
		title: 'Стоимость за 1 бутон',
		dataIndex: 'price',
		key: 'price'
	},
	{
		title: 'Количество',
		dataIndex: 'cnt',
		key: 'cnt'
	},
	{
		title: 'Начало сезона',
		dataIndex: 'season_start',
		key: 'cnt'
	},
	{
		title: 'Конец сезона',
		dataIndex: 'season_end',
		key: 'cnt'
	},
	{
		title: 'Изображение',
		dataIndex: 'img',
		key: 'img',
		render: (_,{img})=>(
			<img src={process.env.REACT_APP_API_URL + img} alt={img} width={100}/>
		)
	},
]
const bouquet_columns = [
	{
		title: 'Артикул',
		dataIndex: 'arc',
		key: 'arc'
	},
	{
		title: 'Название',
		dataIndex: 'title',
		key: 'title'
	},
	{
		title: 'Состав',
		dataIndex: 'composition',
		key: 'composition',
		render: (composition, record) => (
		  <Table
			dataSource={composition}
			style={{width: '100%'}}
			centered
			columns={[
			  {
				title: 'Название цветка',
				dataIndex: 'flower_name',
				key: 'flower_name'
			  },
			  {
				title: 'Количество',
				dataIndex: 'cnt',
				key: 'cnt'
			  }
			]}
		  />
		)
	  },
	  {
		title: 'Категории',
		dataIndex: 'category',
		key: 'category',
		render:
			(_, { category }) => (
				<>
				  { category ? category.map((tag) => {
					let color = tag.categories_name.length > 5 ? 'geekblue' : 'green';
					if (tag.categories_name === 'Монобукеты') {
					  color = 'volcano';
					}
					return (
					  <Tag color={color} key={tag}>
						{tag.categories_name}
					  </Tag>
					);
				  })
				:<></>}
				</>
			  ),
	  },
	{
		title: 'Упаковка',
		dataIndex: 'wrapper_name',
		key: 'wrapper_name'
	},
	{
		title: 'Цена',
		dataIndex: 'price',
		key: 'price'
	},
	{
			title: 'Изображение',
			dataIndex: 'img',
			key: 'img',
			render: (_,{img})=>(
				<Image src={process.env.REACT_APP_API_URL + img} alt={img} width={100}/>
			)
	},
	{
		title: 'Описание',
		dataIndex: 'description',
		key: 'description',
		render: (_,{description}) =>(
			<p style={{fontSize:10}}>{description}</p>
		)
	}
]

const options = [
    {
        label: 'Букеты',
        value: 1
    },
    {
        label: 'Цветы',
        value: 2
    },
    {
        label: 'Упаковки',
        value: 3
    },
    {
        label: 'Категории',
        value: 4
    },
]

function Inventory() {
	useEffect(() => {
		fetchDataFlower();
		fetchDataWrapper();
		fetchDataBouquet();
		fetchDataWrapper_category();
		fetchDataCategory();
	}, [])
	const [status,setStatus] = useState(1);
	//FLOWER
	const [flower,setFlower] = useState([])

	function fetchDataFlower() {
		apiService.get('/flower').then(res => {
			setFlower(res)
		})
		console.log('flower',flower)
	}

	const [modalVisibleFlower, setModalVisibleFlower] = useState(false)
	const [FlowerRecord, setFlowerRecord] = useState({})
	const [flowerImg,setFlowerImg] = useState(null)

	function showFlowerItem(recId) {
		recId
			? apiService.get('/flower/' + recId).then(res => {//promise - then catch
					setFlowerRecord(res)
					setModalVisibleFlower(true)
			  })
			: setModalVisibleFlower(true)
	}

	function saveFlowerItem() {
		const formData = new FormData();
		formData.append('id_record', FlowerRecord.id_record);
		formData.append('title', FlowerRecord.title);
		formData.append('img', flowerImg ); 
		formData.append('price', FlowerRecord.price);
		formData.append('cnt', FlowerRecord.cnt);
		formData.append('season_start', FlowerRecord.season_start);
		formData.append('season_end', FlowerRecord.season_end);

		apiService.postformData('/flower', formData).then(() => {
			closeFlower()
			fetchDataFlower()
		})
	}

	function removeFlowerItem(recId) {
		apiService.delete('/flower/' + recId).then(() => {
			closeFlower()
			fetchDataFlower()
		})
	}
	function closeFlower() {
		setFlowerRecord({})
		setModalVisibleFlower(false)
	}

	//WRAPPER
	const [wrapper,setWrapper] = useState([])

	function fetchDataWrapper() {
		apiService.get('/wrapper').then(res => {
			setWrapper(res);
		})
		console.log('wrapper',wrapper)
	}

	const [modalVisibleWrapper, setModalVisibleWrapper] = useState(false)
	const [WrapperRecord, setWrapperRecord] = useState({})
	const [wrapperImg,setWrapperImg] = useState(null)

	function showWrapperItem(recId) {
		recId
			? apiService.get('/wrapper/' + recId).then(res => {//promise - then catch
					setWrapperRecord(res)
					setModalVisibleWrapper(true)
			  })
			: setModalVisibleWrapper(true)
	}
	function saveWrapperItem() {
		const formData = new FormData();
		formData.append('id_record', WrapperRecord.id_record);
		formData.append('title', WrapperRecord.title);
		formData.append('img', wrapperImg ); 
		formData.append('price', WrapperRecord.price);
		formData.append('cnt', WrapperRecord.cnt);
		formData.append('wrapperCategoryIdRecord', WrapperRecord.wrapperCategoryIdRecord);
		apiService.postformData('/wrapper', formData).then(() => {
			closeWrapper()
			fetchDataWrapper()
		})
	}
	function removeWrapperItem(recId) {
		apiService.delete('/wrapper/' + recId).then(() => {
			closeWrapper()
			fetchDataWrapper()
		})
	}


	function closeWrapper() {
		setWrapperRecord({})
		setModalVisibleWrapper(false)
	}
	//WRAPPER_CATEGORY
	const [wrapper_category,setWrapper_category] = useState([])

	function fetchDataWrapper_category() {
		apiService.get('/wrapper_category').then(res => {
			setWrapper_category(res);
		})
		console.log('wrapper_category',wrapper_category)
	}

	const [modalVisibleWrapper_category, setModalVisibleWrapper_category] = useState(false)
	const [Wrapper_categoryRecord, setWrapper_categoryRecord] = useState({})

	function showWrapper_categoryItem(recId) {
		recId
			? apiService.get('/wrapper_category/' + recId).then(res => {//promise - then catch
					setWrapper_categoryRecord(res)
					setModalVisibleWrapper_category(true)
			  })
			: setModalVisibleWrapper_category(true)
	}
	function saveWrapper_categoryItem() {
		apiService.post('/wrapper_category', Wrapper_categoryRecord).then(() => {
			closeWrapper_category()
			fetchDataWrapper_category()
		})
	}
	function removeWrapper_categoryItem(recId) {
		apiService.delete('/wrapper_category/' + recId).then(() => {
			closeWrapper_category()
			fetchDataWrapper_category()
		})
	}


	function closeWrapper_category() {
		setWrapper_categoryRecord({})
		setModalVisibleWrapper_category(false)
	}

	//Category
	const [category,setCategory] = useState([])

	function fetchDataCategory() {
		apiService.get('/category').then(res => {
			setCategory(res);
		})
		console.log('category',category)
	}

	const [modalVisibleCategory, setModalVisibleCategory] = useState(false)
	const [CategoryRecord, setCategoryRecord] = useState({})

	function showCategoryItem(recId) {
		recId
			? apiService.get('/category/' + recId).then(res => {//promise - then catch
					setCategoryRecord(res)
					setModalVisibleCategory(true)
			  })
			: setModalVisibleCategory(true)
	}
	function saveCategoryItem() {
		apiService.post('/category', CategoryRecord).then(() => {
			closeCategory()
			fetchDataCategory()
		})
	}
	function removeCategoryItem(recId) {
		apiService.delete('/category/' + recId).then(() => {
			closeCategory()
			fetchDataCategory()
		})
	}


	function closeCategory() {
		setCategoryRecord({})
		setModalVisibleCategory(false)
	}

	//Bouquets
	const [bouquets, setBouquets] = useState([{}])

	async function fetchDataBouquet() {
		try {
		  const bouquetRes = await apiService.get('/bouquet');
		  setBouquets(bouquetRes);
		  const updatedBouquets = await Promise.all(bouquetRes.map(async (bouquet) => {
			const compositionRes = await apiService.get('/bouquetcomposition/'+bouquet.arc);
			const categoryRes = await apiService.get('/bouquetcategory/'+bouquet.arc);
			// console.log('bouquetsComposition',compositionRes)
			return {
			  ...bouquet,
			  composition: compositionRes,
			  category: categoryRes,
			};
		  }));
		  setBouquets(updatedBouquets);
		//   console.log('bouquets', updatedBouquets);
		} catch (error) {
		  console.error('Error fetching data:', error);
		}
	  }
	  
	const [bouquetRecord, setBouquetRecord] = useState({})
	const [OldbouquetCompositionRecord, setOldCompositionRecord] = useState([{}])
	const [OldbouquetCategoryRecord, setOldBouquetCategoryRecord] = useState([{}])
	const [bouquetCompositionRecord, setCompositionRecord] = useState([{}])
	const [bouquetCategoryRecord, setBouquetCategoryRecord] = useState([{}])
	const [bouquetImg,setBouquetImg] = useState(null)

	const filteredFlowers = flower.filter(fw => !bouquetCompositionRecord.some(composition => composition.flowerIdRecord === fw.id_record));
	const filteredCategory = category.filter(c => !bouquetCategoryRecord.some(categories => categories.categoryIdRecord === c.id_record));


	const addFlower = () => {
		const newCompositionRecord = [...bouquetCompositionRecord];
		newCompositionRecord.push({ flowerIdRecord: null, cnt: 1 });
		setCompositionRecord(newCompositionRecord);
	  };

	  const addCategory = () => {
		const newCategoryRecord = [...bouquetCategoryRecord];
		newCategoryRecord.push({ categoryIdRecord: null });
		setBouquetCategoryRecord(newCategoryRecord);
	  };
	// const [flowerInCompositionRecord, setFlowerInCompositionRecord] = useState({})
	const [modalVisibleBouquet, setModalVisibleBouquet] = useState(false)
	
	function showItemBouquet(recId) {
		recId
			? apiService.get('/bouquet/' + recId).then(res => {//promise - then catch
					setBouquetRecord(res)
					apiService.get('/bouquetcomposition/' + recId).then(res1 => {
						setCompositionRecord(res1);
						setOldCompositionRecord(res1);
					});
					apiService.get('/bouquetcategory/' + recId).then(res1 => {
						setBouquetCategoryRecord(res1);
						setOldBouquetCategoryRecord(res1);
					});
					setModalVisibleBouquet(true)
			  })
			: setModalVisibleBouquet(true)
	}
	function saveItemBouquet() {
		apiService.post('/bouquet', bouquetRecord).then((res) => {
			console.log(res);
			closeBouquet()
			fetchDataBouquet()
		})
	}
	function saveItemBouquetandComposition() {
		const formData = new FormData();
		formData.append('arc', bouquetRecord.arc);
		formData.append('title', bouquetRecord.title);
		formData.append('img', bouquetImg ); 
		formData.append('price', bouquetRecord.price);
		formData.append('description', bouquetRecord.description);
		formData.append('ready_made', bouquetRecord.ready_made);
		formData.append('wrapperIdRecord', bouquetRecord.wrapperIdRecord);
		console.log('bouquetFormData',formData)
		let arc = bouquetRecord.arc;
		if (arc) {
			if (OldbouquetCompositionRecord !== bouquetCompositionRecord) apiService.delete('/bouquetcomposition/'+arc);
			if (OldbouquetCategoryRecord !== bouquetCategoryRecord) apiService.delete('/bouquetcategory/'+arc);
		}
		apiService.postformData('/bouquet', formData).then((res) => {
	        console.log('res',res);
			if (!arc) arc = res.arc
			if (OldbouquetCompositionRecord !== bouquetCompositionRecord) 
			{bouquetCompositionRecord.map(record =>
				apiService.post('/bouquetcomposition/'+arc, record).then(() => {
                })
			)}
			if (OldbouquetCategoryRecord !== bouquetCategoryRecord) {
				bouquetCategoryRecord.map(record =>
				apiService.post('/bouquetcategory/'+arc, record).then(() => {
                })
			)}
			closeBouquet()
			fetchDataBouquet()
		})
	}
	function removeItemBouquet(recId) {
		apiService.delete('/bouquet/' + recId).then(() => {
			closeBouquet()
			fetchDataBouquet()
		})
	}

	function closeBouquet() {
		setBouquetRecord({})
		setCompositionRecord([{}])
		setModalVisibleBouquet(false)
	}

	

	return (
		<>
			<Segmented options={options} className='mb-3'
            onChange={(value) => { 
				setStatus(value);
            }}/>
			{ (status===1) ?
			<div className='mt-3'>
			{console.log('bouquets',bouquets)}
			<Button className='mb-3 pupleButton'  onClick={() => showItemBouquet()}>
				Добавить
			</Button>
			<Table
				pagination={{ position: ['bottomRight'] }}
				dataSource={bouquets}
				columns={bouquet_columns}
				onRow={rec => {//поведение для строчки
					return {
						onClick: () => showItemBouquet(rec.arc)
					}
				}}
			></Table>
			<Modal
				title={bouquetRecord.arc ? 'Изменение сущности с артикулом =' + bouquetRecord.arc : 'Добавление новой сущности'}
				open={modalVisibleBouquet}
				okText='Сохранить'
				cancelText='Отмена'
				onCancel={() => closeBouquet()}
				centered
				footer={[
					<Button type='primary' onClick={() =>  saveItemBouquetandComposition()} disabled={!bouquetRecord.title || !bouquetRecord.wrapperIdRecord}>
						Сохранить
					</Button>,
					bouquetRecord.arc ? (
						<Button danger onClick={() => removeItemBouquet(bouquetRecord.arc)}>
							Удалить
						</Button>
					) : null,
					<Button onClick={() => closeBouquet()}>Отмена</Button>
				]
			}
			>
				{console.log('bouquetRec',bouquetRecord)}
				{console.log('bouquetCompositionRecord',bouquetCompositionRecord)}
				<Form layout='vertical' labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
					<Form.Item label='Название'>
						<Input
							onChange={v =>
								setBouquetRecord(prevState => {
									return { ...prevState, title: v.target.value }//... - operator spret - ...
								})
							}
							value={bouquetRecord.title}
						/>
					</Form.Item>
					<Form.Item label='Упаковка'>
						<Select 
						onChange={v =>
							setBouquetRecord(prevState => {
								return { ...prevState, wrapperIdRecord: v}
							})
						}
						value={bouquetRecord.wrapperIdRecord}>
							{wrapper.map(wrapper => (
                                <Select.Option key={wrapper.id_record} value={wrapper.id_record}>
                                    {wrapper.title}
                                </Select.Option>
                            ))}
                        </Select>
					</Form.Item>
					{/* {bouquetRecord.arc ?  
					<> */}
					<Form.Item label='Состав'>  
						{bouquetCompositionRecord.map((composition, index) => (
						<Row>
							<Col md={15}>
								<Select 
									key={index}
									onChange={v => {
											//учесть count и учесть flower одновремено тк flower pk потому стоит просто удалить предыдущий состав и заменить на новый
											const updatedRecords = bouquetCompositionRecord.map((item, i) => 
											i === index ? { ...item, flowerIdRecord: v } : item);
											setCompositionRecord(updatedRecords);
									}}
									value={composition.flower_name}
								>
								{filteredFlowers.map(fw => (
									<Select.Option key={fw.id_record} value={fw.id_record}>
										{fw.title}
									</Select.Option>
								))}
								{console.log('filteredFlowers',filteredFlowers,flower)}
								</Select>
							</Col>
						<Col md={6}>
							<InputNumber min={1} defaultValue={1} onChange={v => {
									const updatedRecords = bouquetCompositionRecord.map((item, i) => 
									i === index ? { ...item, cnt: v } : item);
									setCompositionRecord(updatedRecords);
									}} />
						</Col>
						<Col md={3}>
							<Button onClick={() => {
								const updatedRecords = bouquetCompositionRecord.filter((item, i) => i !== index);
								setCompositionRecord(updatedRecords);
							}}>Удалить</Button>
						</Col>
						</Row>
						))}
						<Button onClick={addFlower}>Добавить цветок</Button>
					</Form.Item>
					<Form.Item label='Категории'>	
						{bouquetCategoryRecord.map((categories, index) => (
							<Row>
								<Col>
						  		<Select 
									key={index}
									onChange={v => {
										//учесть count и учесть flower одновремено тк flower pk потому стоит просто удалить предыдущий состав и заменить на новый
										const updatedRecords = bouquetCategoryRecord.map((item, i) => 
										i === index ? { ...item, categoryIdRecord: v } : item);
										setBouquetCategoryRecord(updatedRecords);
									  }}
									value={categories.categories_name}
								  >
									{filteredCategory.map(c => (
									  <Select.Option key={c.id_record} value={c.id_record}>
										{c.title}
									  </Select.Option>
									))}
								  </Select>
								</Col>
								<Col>
								<Button onClick={() => {
									const updatedRecords = bouquetCategoryRecord.filter((item, i) => i !== index);
									setBouquetCategoryRecord(updatedRecords);
								}}>Удалить</Button>
								</Col>
							</Row>
						))}
						<Button onClick={addCategory}>Добавить категорию</Button>
					</Form.Item>
					<Form.Item label='Цена'>
						<Input type='number'
							onChange={v =>
								setBouquetRecord(prevState => {
									return { ...prevState, price: v.target.value }//... - operator spret - ...
								})
							}
							value={bouquetRecord.price}
						/>
					</Form.Item>
					<ReactForm.Group controlId="formFile" className="mb-3">
						<ReactForm.Label>Изображение</ReactForm.Label>
						<ReactForm.Control type="file" 
							onChange={v =>
							{
								console.log(v.target.files[0]);
								setBouquetImg(v.target.files[0]);
							}
						}/>
					</ReactForm.Group>
					<Form.Item label='Описание'>
						<Input 
							onChange={v =>
								setBouquetRecord(prevState => {
									return { ...prevState, description: v.target.value }//... - operator spret - ...
								})
							}
							value={bouquetRecord.description}
						/>
					</Form.Item>
					{/* </>
					:<></>
					} */}
				</Form>
			</Modal>
			</div> 
			:<></>
			}
			{(status === 2) ?
			<div className='mt-3'>
				<Button className='mb-3 pupleButton' type='primary' onClick={() => showFlowerItem()}>
					Добавить
				</Button>
				<Table
					pagination={{ position: ['bottomRight'] }}
					dataSource={flower}
					columns={flower_columns}
					onRow={rec => {//поведение для строчки
						return {
							onClick: () => showFlowerItem(rec.id_record)
						}
					}}
				></Table>
				<Modal
					title={FlowerRecord.id_record ? 'Изменение сущности с id=' + FlowerRecord.id_record : 'Добавление новой сущности'}
					open={modalVisibleFlower}
					okText='Сохранить'
					cancelText='Отмена'
					onCancel={() => closeFlower()}
					centered
					footer={[
						<Button className='mb-3 pupleButton' type='primary' onClick={() => saveFlowerItem()} disabled={!FlowerRecord.title}>
							Сохранить
						</Button>,
						FlowerRecord.id_record ? (
							<Button danger onClick={() => removeFlowerItem(FlowerRecord.id_record)}>
								Удалить
							</Button>
						) : null,
						<Button className='mb-3 pupleButton' onClick={() => closeFlower()}>Отмена</Button>
					]
				}
				>
					{console.log('FlowerRec',FlowerRecord)}
					
					<Form labelAlign='left' labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
						<Form.Item label='Название'>
							<Input
								onChange={v =>
									setFlowerRecord(prevState => {
										return { ...prevState, title: v.target.value }//... - operator spret - ...
									})
								}
								value={FlowerRecord.title}
							/>
						</Form.Item>
						<Form.Item label='Стоимость за 1 буттон'>
							<Input
								onChange={v =>
									setFlowerRecord(prevState => {
										return { ...prevState, price: v.target.value }//... - operator spret - ...
									})
								}
								value={FlowerRecord.price}
							/>
						</Form.Item>
						<Form.Item label='Количество'>
							<Input
								onChange={v =>
									setFlowerRecord(prevState => {
										return { ...prevState, cnt: v.target.value }//... - operator spret - ...
									})
								}
								value={FlowerRecord.cnt}
							/>
						</Form.Item>
						<Form.Item label='Начало сезона'>
							<Input type='date'
								onChange={v =>
									setFlowerRecord(prevState => {
										return { ...prevState, season_start: v.target.value }//... - operator spret - ...
									})
								}
								value={FlowerRecord.season_start}
							/>
						</Form.Item>
						<Form.Item label='Конец сезона'>
							<Input type='date'
								onChange={v =>
									setFlowerRecord(prevState => {
										return { ...prevState, season_end: v.target.value }//... - operator spret - ...
									})
								}
								value={FlowerRecord.season_end}
							/>
						</Form.Item>
						<ReactForm.Group controlId="formFile" className="mb-3">
								<ReactForm.Label>Изображение</ReactForm.Label>
								<ReactForm.Control type="file" 
								onChange={v =>
									{
										console.log(v.target.files[0])
										setFlowerImg(v.target.files[0]);
									}
								}/>
						</ReactForm.Group>
					</Form>
				</Modal>
			</div> 
			:<></>
			}
			{(status===3) ?
			<>
				<h2>Упаковки</h2>
				<div className='mt-3'>
					<Button className='mb-3 pupleButton' type='primary'  
					onClick={() => showWrapperItem()}>
						Добавить
					</Button>
					<Table
						pagination={{ position: ['bottomRight'] }}
						dataSource={wrapper}
						columns={wrapper_columns}
						onRow={rec => {//поведение для строчки
							return {
								onClick: () => showWrapperItem(rec.id_record)
							}
						}}
					></Table>
					<Modal
						title={WrapperRecord.id_record ? 'Изменение сущности с id=' + WrapperRecord.id_record : 'Добавление новой сущности'}
						open={modalVisibleWrapper}
						okText='Сохранить'
						cancelText='Отмена'
						onCancel={() => closeWrapper()}
						centered
						footer={[
							<Button type='primary' onClick={() => saveWrapperItem()} disabled={!WrapperRecord.title}>
								Сохранить
							</Button>,
							WrapperRecord.id_record ? (
								<Button danger onClick={() => removeWrapperItem(WrapperRecord.id_record)}>
									Удалить
								</Button>
							) : null,
							<Button onClick={() => closeWrapper()}>Отмена</Button>
						]
					}
					>
						{console.log('WrapperRec',WrapperRecord)}
						
						<Form labelAlign='left' labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
							<Form.Item label='Название'>
								<Input
									onChange={v =>
										setWrapperRecord(prevState => {
											return { ...prevState, title: v.target.value }//... - operator spret - ...
										})
									}
									value={WrapperRecord.title}
								/>
							</Form.Item>
							<Form.Item label='Категория'>
								<Select 
								onChange={v =>
									setWrapperRecord(prevState => {
										return { ...prevState, wrapperCategoryIdRecord: v}
									})
								}
								value={WrapperRecord.wrapperCategoryIdRecord}>
									{wrapper_category.map(wrapper => (
										<Select.Option key={wrapper.id_record} value={wrapper.id_record}>
											{wrapper.title}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item label='Стоимость за 1 шт.'>
								<Input
									onChange={v =>
										setWrapperRecord(prevState => {
											return { ...prevState, price: v.target.value }//... - operator spret - ...
										})
									}
									value={WrapperRecord.price}
								/>
							</Form.Item>
							<Form.Item label='Количество'>
								<Input
									onChange={v =>
										setWrapperRecord(prevState => {
											return { ...prevState, cnt: v.target.value }//... - operator spret - ...
										})
									}
									value={WrapperRecord.cnt}
								/>
							</Form.Item>
							<ReactForm.Group controlId="formFile" className="mb-3">
								<ReactForm.Label>Изображение</ReactForm.Label>
								<ReactForm.Control type="file" 
								onChange={v =>
									{
										console.log(v.target.files[0])
										setWrapperImg(v.target.files[0]);
									}
								}/>
							</ReactForm.Group>
						</Form>
					</Modal>
				</div>
				<h2>Категории упаковки</h2>
				<div className='mt-3'>
					<Button className='mb-3 pupleButton' type='primary'  
					onClick={() => showWrapper_categoryItem()}>
						Добавить
					</Button>
					<Table
						pagination={{ position: ['bottomRight'] }}
						dataSource={wrapper_category}
						columns={category_columns}
						onRow={rec => {//поведение для строчки
							return {
								onClick: () => showWrapper_categoryItem(rec.id_record)
							}
						}}
					></Table>
					<Modal
						title={Wrapper_categoryRecord.id_record ? 'Изменение сущности с id=' + Wrapper_categoryRecord.id_record : 'Добавление новой сущности'}
						open={modalVisibleWrapper_category}
						okText='Сохранить'
						cancelText='Отмена'
						onCancel={() => closeWrapper_category()}
						centered
						footer={[
							<Button type='primary' onClick={() => saveWrapper_categoryItem()} disabled={!Wrapper_categoryRecord.title}>
								Сохранить
							</Button>,
							Wrapper_categoryRecord.id_record ? (
								<Button danger onClick={() => removeWrapper_categoryItem(Wrapper_categoryRecord.id_record)}>
									Удалить
								</Button>
							) : null,
							<Button onClick={() => closeWrapper_category()}>Отмена</Button>
						]
					}
					>
						{console.log('Wrapper_categoryRec',Wrapper_categoryRecord)}
						
						<Form labelAlign='left' labelCol={{ span: 4 }} wrapper_categoryCol={{ span: 18 }}>
							<Form.Item label='Название'>
								<Input
									onChange={v =>
										setWrapper_categoryRecord(prevState => {
											return { ...prevState, title: v.target.value }//... - operator spret - ...
										})
									}
									value={Wrapper_categoryRecord.title}
								/>
							</Form.Item>
						</Form>
					</Modal>
				</div>
			</>
			:<></>
			}
			{(status===4) ?
			<div className='mt-3'>
				<Button className='mb-3 pupleButton' type='primary'  
				onClick={() => showCategoryItem()}>
					Добавить
				</Button>
				<Table
					pagination={{ position: ['bottomRight'] }}
					dataSource={category}
					columns={category_columns}
					onRow={rec => {//поведение для строчки
						return {
							onClick: () => showCategoryItem(rec.id_record)
						}
					}}
				></Table>
				<Modal
					title={CategoryRecord.id_record ? 'Изменение сущности с id=' + CategoryRecord.id_record : 'Добавление новой сущности'}
					open={modalVisibleCategory}
					okText='Сохранить'
					cancelText='Отмена'
					onCancel={() => closeCategory()}
					centered
					footer={[
						<Button type='primary' onClick={() => saveCategoryItem()} disabled={!CategoryRecord.title}>
							Сохранить
						</Button>,
						CategoryRecord.id_record ? (
							<Button danger onClick={() => removeCategoryItem(CategoryRecord.id_record)}>
								Удалить
							</Button>
						) : null,
						<Button onClick={() => closeCategory()}>Отмена</Button>
					]
				}
				>
					{console.log('CategoryRec',CategoryRecord)}
					
					<Form labelAlign='left' labelCol={{ span: 4 }} categoryCol={{ span: 18 }}>
						<Form.Item label='Название'>
							<Input
								onChange={v =>
									setCategoryRecord(prevState => {
										return { ...prevState, title: v.target.value }//... - operator spret - ...
									})
								}
								value={CategoryRecord.title}
							/>
						</Form.Item>
					</Form>
				</Modal>
			</div>
			:<></>
			}
		</>
	)
}
export default Inventory;

