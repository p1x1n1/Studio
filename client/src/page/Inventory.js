import { Form, Button, Input, Table, Modal, Select } from 'antd'
import { ApiService } from '../http/api.service'
import { useEffect, useState } from 'react'

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
	}
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
		key: 'img'
	}
]
const boquet_columns = [
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
			columns={[
			  {
				title: 'Название цветка',
				dataIndex: 'flower_name',
				key: 'flower_name'
			  },
			  {
				title: 'Количество',
				dataIndex: 'count_',
				key: 'count_'
			  }
			]}
			/*onRow={rec => {//поведение для строчки
				return {
					onClick: () => showBoquetItem(rec.arc_boquets,rec.id_record_flowers)
				}
			}}*/
		  />
		)
	  },
	{
		title: 'Упаковка',
		dataIndex: 'wrapper_name',
		key: 'wrapper_name'
	},
	{
			title: 'Изображение',
			dataIndex: 'img',
			key: 'img'
	}
]



function Inventory() {
	useEffect(() => {
		fetchDataFlower();
		fetchDataWrapper();
		fetchDataBoquet();
	}, [])
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


	function showFlowerItem(recId) {
		recId
			? apiService.get('/flower/' + recId).then(res => {//promise - then catch
					setFlowerRecord(res)
					setModalVisibleFlower(true)
			  })
			: setModalVisibleFlower(true)
	}

	function saveFlowerItem() {
		apiService.post('/flower', FlowerRecord).then(() => {
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

	function showWrapperItem(recId) {
		recId
			? apiService.get('/wrapper/' + recId).then(res => {//promise - then catch
					setFlowerRecord(res)
					setModalVisibleWrapper(true)
			  })
			: setModalVisibleWrapper(true)
	}
	function saveWrapperItem() {
		apiService.post('/wrapper', WrapperRecord).then(() => {
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

	//Boquets
	const [boquets, setBoquets] = useState([])
	//const [boquet_composition,setComposition] = useState([]);
		/*
	function fetchDataBoquet() {
		apiService.get('/boquet/info').then(res => {
			const updatedBoquets = res.map(boquet => {
				apiService.get('/boquetcomposition/'+boquet.arc).then(res1 => {
					setComposition(res1)
				})
				return {
					...boquet,
					boquet_composition: boquet_composition
				};
			});
			setBoquets(updatedBoquets);
		})
		console.log('boquet',boquets)
	}
	*/
	async function fetchDataBoquet() {
		try {
		  const boquetRes = await apiService.get('/boquet/info');
		  console.log('boquets',boquetRes)
		  const updatedBoquets = await Promise.all(boquetRes.map(async (boquet) => {
			const compositionRes = await apiService.get('/boquetcomposition/'+boquet.arc);
			console.log('boquetsComposition',compositionRes)
			return {
			  ...boquet,
			  composition: compositionRes
			};
		  }));
		  setBoquets(updatedBoquets);
		  console.log('boquets', updatedBoquets);
		} catch (error) {
		  console.error('Error fetching data:', error);
		}
	  }
	  
	const [boquetRecord, setBoquetRecord] = useState({})
	const [boquetCompositionRecord, setCompositionRecord] = useState([{}])
	const [flowerInCompositionRecord, setFlowerInCompositionRecord] = useState({})
	const [modalVisibleBoquet, setModalVisibleBoquet] = useState(false)
	
	function showItemBoquet(recId) {
		recId
			? apiService.get('/boquet/' + recId).then(res => {//promise - then catch
					setBoquetRecord(res)
					apiService.get('/boquetcomposition/' + recId).then(res1 => {
						setCompositionRecord(res1)
					});
					setModalVisibleBoquet(true)
			  })
			: setModalVisibleBoquet(true)
	}
	function saveItemBoquet() {
		apiService.post('/boquet', boquetRecord).then(() => {
			closeBoquet()
			fetchDataBoquet()
		})
	}
	function saveItemBoquetandComposition() {
		console.log('saveItemBoquetandComposition');
		apiService.post('/boquet/', boquetRecord).then(() => {
			boquetCompositionRecord.map(record =>
				apiService.post('/boquetcomposition/update', record).then(() => {
                })
			)
			closeBoquet()
			fetchDataBoquet()
		})
	}
	function removeItemBoquet(recId) {
		apiService.delete('/boquet/' + recId).then(() => {
			closeBoquet()
			fetchDataBoquet()
		})
	}

	function closeBoquet() {
		setBoquetRecord({})
		setCompositionRecord([{}])
		setModalVisibleBoquet(false)
	}
	return (
		<>
			<>
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
						<Form.Item label='Изображение'>
							<Input
								onChange={v =>
									setFlowerRecord(prevState => {
										return { ...prevState, img: v.target.value }//... - operator spret - ...
									})
								}
								value={FlowerRecord.img}
							/>
						</Form.Item>
					</Form>
				</Modal>
			</>
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
						<Form.Item label='Изображение'>
							<Input
								onChange={v =>
									setWrapperRecord(prevState => {
										return { ...prevState, img: v.target.value }//... - operator spret - ...
									})
								}
								value={WrapperRecord.img}
							/>
						</Form.Item>
					</Form>
				</Modal>
			</div>
			{
			/* <>
			<Button className='mb-3' type='primary' onClick={() => showItemBoquet()}>
				Добавить
			</Button>
			<Table
				pagination={{ position: ['bottomRight'] }}
				dataSource={boquets}
				columns={boquet_columns}
				onRow={rec => {//поведение для строчки
					return {
						onClick: () => showItemBoquet(rec.arc)
					}
				}}
			></Table>
			<Modal
				title={boquetRecord.arc ? 'Изменение сущности с arc=' + boquetRecord.arc : 'Добавление новой сущности'}
				open={modalVisibleBoquet}
				okText='Сохранить'
				cancelText='Отмена'
				onCancel={() => closeBoquet()}
				centered
				footer={[
					
					<Button type='primary' onClick={() => boquetRecord.arc ? saveItemBoquetandComposition() : saveItemBoquet()} disabled={!boquetRecord.title || !boquetRecord.wrapper_}>
						Сохранить
					</Button>,
					boquetRecord.arc ? (
						<Button danger onClick={() => removeItemBoquet(boquetRecord.arc)}>
							Удалить
						</Button>
					) : null,
					<Button onClick={() => closeBoquet()}>Отмена</Button>
				]
			}
			>
				{console.log('boquetRec',boquetRecord)}
				{console.log('boquetCompositionRecord',boquetCompositionRecord)}
				<Form labelAlign='left' labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
					<Form.Item label='Название'>
						<Input
							onChange={v =>
								setBoquetRecord(prevState => {
									return { ...prevState, title: v.target.value }//... - operator spret - ...
								})
							}
							value={boquetRecord.title}
						/>
					</Form.Item>
					<Form.Item label='Упаковка'>
						<Select 
						onChange={v =>
							setBoquetRecord(prevState => {
								return { ...prevState, wrapper_: v}
							})
						}
						value={boquetRecord.wrapper_}>
							{wrapper.map(wrapper => (
                                <Select.Option key={wrapper.id_record} value={wrapper.id_record}>
                                    {wrapper.title}
                                </Select.Option>
                            ))}
                        </Select>
					</Form.Item>
					{boquetRecord.arc ?  
					<>
						<Form.Item label='Состав'>
						{boquetCompositionRecord.map((composition, index) => (
						  <Select 
							key={index}
							onChange={v => {
								//учесть count и учесть flower одновремено сложно пиздец
								const updatedRecords = boquetCompositionRecord.map((item, i) => i === index ? { ...item, id_record_flowers: v } : item);
								setCompositionRecord(updatedRecords);
							  }}
							value={composition.id_record_flowers}
						  >
							{flower.map(fw => (
							  <Select.Option key={fw.id_record} value={fw.id_record}>
								{fw.title}
							  </Select.Option>
							))}
						  </Select>
						))}
					  </Form.Item>
					</>
					:<></>
					}
				</Form>
			</Modal>
			</> */
			}
		</>
	)
}
export default Inventory;

