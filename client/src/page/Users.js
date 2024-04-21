import { Form, Button, Input, Table, Modal, Select } from 'antd'
import { ApiService } from '../http/api.service'
import { useEffect, useState } from 'react'

const apiService = new ApiService()

const user_columns = [
	{
		title: 'Логин',
		dataIndex: 'login',
		key: 'login'
	},
	{
		title: 'Почта',
		dataIndex: 'email',
		key: 'email'
	},
	{
		title: 'Телефон',
		dataIndex: 'phone',
		key: 'phone'
	},
	{
		title: 'Имя',
		dataIndex: 'name_',
		key: 'name_'
	},
    {
		title: 'Фамилия',
		dataIndex: 'surname',
		key: 'surname'
	},
    {
		title: 'Отчество',
		dataIndex: 'lastname',
		key: 'lastname'
	},
	{
		title: 'Сумма заказов',
		dataIndex: 'order_sum',
		key: 'order_sum'
	},
    {
		title: 'Процент скидки',
		dataIndex: 'procent',
		key: 'procent'
	},
]

const employee_columns = [
	{
		title: 'Логин',
		dataIndex: 'login',
		key: 'login'
	},
	{
		title: 'Почта',
		dataIndex: 'email',
		key: 'email'
	},
	{
		title: 'Телефон',
		dataIndex: 'phone',
		key: 'phone'
	},
	{
		title: 'Имя',
		dataIndex: 'name_',
		key: 'name_'
	},
    {
		title: 'Фамилия',
		dataIndex: 'surname',
		key: 'surname'
	},
    {
		title: 'Отчество',
		dataIndex: 'lastname',
		key: 'lastname'
	},
    {
		title: 'Должность',
		dataIndex: 'title',
		key: 'title'
	},
]
function Users() {   
	//Users  
	const [user,setUser] = useState([])
	// const [post,setPost] = useState([])
    function fetchDataUser() {
		apiService.get('/user').then(res => {
			setUser(res)
		})
		console.log('user',user)
	}
	// function fetchDataPost() {
	// 	apiService.get('/post').then(res => {
	// 		setPost(res)
	// 	})
	// 	console.log('post',post)
	// }
    useEffect(() => {
		fetchDataUser();
		fetchDataPost();
	}, [])
    const [modalVisibleUser, setModalVisibleUser] = useState(false)
    const [UserRecord, setUserRecord] = useState({})
    function showUserItem(login) {
		console.log('userLogin',login)
		login
			? apiService.get('/user/' + login).then(res => {//promise - then catch
					setUserRecord(res)
					setModalVisibleUser(true)
			  })
			: setModalVisibleUser(true)
	}
    function saveUserItem(login) {
		isCreate ?
		apiService.post('/user', UserRecord).then(() => {
			closeUser()
			fetchDataUser()
		})
		:
		apiService.post('/user/'+login, UserRecord).then(() => {
			closeUser()
			fetchDataUser()
		})
	}

	function removeUserItem(login) {
		apiService.delete('/user/' + login).then(() => {
			closeUser()
			fetchDataUser()
		})
	}
    function closeUser() {
		setUserRecord({})
		setModalVisibleUser(false)
		setIsCreate(false)
	}
	//Employee
	const [employee,setEmployee] = useState([])
	const [post,setPost] = useState([])
    function fetchDataEmployee() {
		apiService.get('/employee').then(res => {
			setEmployee(res)
		})
		console.log('employee',employee)
	}
	function fetchDataPost() {
		apiService.get('/post').then(res => {
			setPost(res)
		})
		console.log('post',post)
	}
    useEffect(() => {
		fetchDataEmployee();
		fetchDataPost();
	}, [])
    const [modalVisibleEmployee, setModalVisibleEmployee] = useState(false)
	const [isCreate, setIsCreate] = useState(false)
    const [EmployeeRecord, setEmployeeRecord] = useState({})
    function showEmployeeItem(login) {
		login
			? apiService.get('/employee/' + login).then(res => {//promise - then catch
					setEmployeeRecord(res)
					setModalVisibleEmployee(true)
			  })
			: setModalVisibleEmployee(true)
	}
    function saveEmployeeItem(login) {
		isCreate ?
		apiService.post('/employee', EmployeeRecord).then(() => {
			closeEmployee()
			fetchDataEmployee()
		})
		:
		apiService.post('/employee/'+login, EmployeeRecord).then(() => {
			closeEmployee()
			fetchDataEmployee()
		})
	}

	function removeEmployeeItem(login) {
		apiService.delete('/employee/' + login).then(() => {
			closeEmployee()
			fetchDataEmployee()
		})
	}
    function closeEmployee() {
		setEmployeeRecord({})
		setModalVisibleEmployee(false)
		setIsCreate(false)
	}
    return (
		<>
			<>
				<h1>Заказчики</h1>
				<Button className='mb-3 pupleButton' type='primary' onClick={() => {setModalVisibleUser(true); setIsCreate(true)}}>
					Добавить
				</Button>
				<Table
					pagination={{ position: ['bottomRight'] }}
					dataSource={user}
					columns={user_columns}
					onRow={rec => {//поведение для строчки
						return {
							onClick: () => showUserItem(rec.login)
						}
					}}
				></Table>
				<Modal
					title={!isCreate ? 'Изменение сущности с login=' + UserRecord.login : 'Добавление новой сущности'}
					open={modalVisibleUser}
					okText='Сохранить'
					cancelText='Отмена'
					onCancel={() => closeUser()}
					centered
					footer={[
						<Button className='mb-3'type='primary' onClick={() => { isCreate ? saveUserItem() : saveUserItem(UserRecord.login) }} disabled={!UserRecord.login && !UserRecord.email}>
							Сохранить
						</Button>,
						!isCreate ? (
							<Button danger onClick={() => removeUserItem(UserRecord.login)}>
								Удалить
							</Button>
						) : null,
						<Button onClick={() => closeUser()}>Отмена</Button>
					]
				}
				>
					{console.log('UserRec',UserRecord)}
					
					<Form labelAlign='left' labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
						<Form.Item label='Логин'>
							<Input disabled={!isCreate}
								onChange={v =>
									setUserRecord(prevState => {
										return { ...prevState, login: v.target.value }//... - operator spret - ...
									})
								}
								value={UserRecord.login}
							/>
						</Form.Item>
						<Form.Item label='Почта'>
							<Input disabled={!isCreate}
								onChange={v =>
									setUserRecord(prevState => {
										return { ...prevState, email: v.target.value }//... - operator spret - ...
									})
								}
								value={UserRecord.email}
							/>
						</Form.Item>
						<Form.Item label='Телефон'>
							<Input
								onChange={v =>
									setUserRecord(prevState => {
										return { ...prevState, phone: v.target.value }//... - operator spret - ...
									})
								}
								value={UserRecord.phone}
							/>
						</Form.Item>
						<Form.Item label='Имя'>
							<Input
								onChange={v =>
									setUserRecord(prevState => {
										return { ...prevState, name_: v.target.value }//... - operator spret - ...
									})
								}
								value={UserRecord.name_}
							/>
						</Form.Item>
						<Form.Item label='Фамилия'>
							<Input
								onChange={v =>
									setUserRecord(prevState => {
										return { ...prevState, surname: v.target.value }//... - operator spret - ...
									})
								}
								value={UserRecord.surname}
							/>
						</Form.Item>
						<Form.Item label='Отчество'>
							<Input
								onChange={v =>
									setUserRecord(prevState => {
										return { ...prevState, lastname: v.target.value }//... - operator spret - ...
									})
								}
								value={UserRecord.lastname}
							/>
						</Form.Item>
					</Form>
				</Modal>
			</>
			<>
				<h1>Сотрудники</h1>
				<Button className='mb-3 pupleButton' type='primary' onClick={() => {setModalVisibleEmployee(true); setIsCreate(true)}}>
					Добавить
				</Button>
				<Table
					pagination={{ position: ['bottomRight'] }}
					dataSource={employee}
					columns={employee_columns}
					onRow={rec => {//поведение для строчки
						return {
							onClick: () => showEmployeeItem(rec.login)
						}
					}}
				></Table>
				<Modal
					title={!isCreate ? 'Изменение сущности с login=' + EmployeeRecord.login : 'Добавление новой сущности'}
					open={modalVisibleEmployee}
					okText='Сохранить'
					cancelText='Отмена'
					onCancel={() => closeEmployee()}
					centered
					footer={[
						<Button className='mb-3'type='primary' onClick={() => { isCreate ? saveEmployeeItem() : saveEmployeeItem(EmployeeRecord.login) }} disabled={!EmployeeRecord.login && !EmployeeRecord.email && !EmployeeRecord.postIdRecord }>
							Сохранить
						</Button>,
						!isCreate ? (
							<Button danger onClick={() => removeEmployeeItem(EmployeeRecord.login)}>
								Удалить
							</Button>
						) : null,
						<Button onClick={() => closeEmployee()}>Отмена</Button>
					]
				}
				>
					{console.log('EmployeeRec',EmployeeRecord)}
					
					<Form labelAlign='left' labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
						<Form.Item label='Логин'>
							<Input disabled={!isCreate}
								onChange={v =>
									setEmployeeRecord(prevState => {
										return { ...prevState, login: v.target.value }//... - operator spret - ...
									})
								}
								value={EmployeeRecord.login}
							/>
						</Form.Item>
						<Form.Item label='Почта'>
							<Input disabled={!isCreate}
								onChange={v =>
									setEmployeeRecord(prevState => {
										return { ...prevState, email: v.target.value }//... - operator spret - ...
									})
								}
								value={EmployeeRecord.email}
							/>
						</Form.Item>
						<Form.Item label='Телефон'>
							<Input
								onChange={v =>
									setEmployeeRecord(prevState => {
										return { ...prevState, phone: v.target.value }//... - operator spret - ...
									})
								}
								value={EmployeeRecord.phone}
							/>
						</Form.Item>
						<Form.Item label='Имя'>
							<Input
								onChange={v =>
									setEmployeeRecord(prevState => {
										return { ...prevState, name_: v.target.value }//... - operator spret - ...
									})
								}
								value={EmployeeRecord.name_}
							/>
						</Form.Item>
						<Form.Item label='Фамилия'>
							<Input
								onChange={v =>
									setEmployeeRecord(prevState => {
										return { ...prevState, surname: v.target.value }//... - operator spret - ...
									})
								}
								value={EmployeeRecord.surname}
							/>
						</Form.Item>
						<Form.Item label='Отчество'>
							<Input
								onChange={v =>
									setEmployeeRecord(prevState => {
										return { ...prevState, lastname: v.target.value }//... - operator spret - ...
									})
								}
								value={EmployeeRecord.lastname}
							/>
						</Form.Item>
						<Form.Item label='Должность'>
						<Select 
						onChange={v =>
							setEmployeeRecord(prevState => {
								return { ...prevState, postIdRecord: v }//... - operator spret - ...
							})
						}
						value={EmployeeRecord.postIdRecord}>
							{post.map(post => (
                                <Select.Option key={post.id_record} value={post.id_record}>
                                    {post.title}
                                </Select.Option>
                            ))}
                        </Select>
						</Form.Item>
					</Form>
				</Modal>
			</>
		</>
    );
}

export default Users;