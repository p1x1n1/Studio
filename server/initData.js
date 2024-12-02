const bcrypt = require('bcrypt');

const { 
    Employee, 
    Post, 
    Category, 
    WrapperCategory, 
    Wrapper, 
    Locality, 
    StatusOrder, 
    Discount, 
    Flower, 
    Bouquet 
} = require('./models/models'); // Пути к вашим моделям

const initData = async () => {
    try {
        // Создание постов (ролей сотрудников)
        const admin = await Post.findOrCreate({ where: { title: 'Администратор' } });
        const florist = await Post.findOrCreate({ where: { title: 'Флорист' } });
        const courier = await Post.findOrCreate({ where: { title: 'Курьер' } });

        // Создание сотрудников
        await Employee.findOrCreate({
            where: { login: 'florist' },
            defaults: {
                email: 'florist@example.com',
                password_: await bcrypt.hash('floristpassword', 5),
                name_: 'Флорист',
                lastname: 'Флористов',
                surname: 'Флористович',
                phone: '1111111111',
                postIdRecord: florist[0].id_record
            }
        });

        await Employee.findOrCreate({
            where: { login: 'admin' },
            defaults: {
                email: 'admin@example.com',
                password_: await bcrypt.hash('adminpassword', 5),
                name_: 'Админ',
                lastname: 'Админов',
                surname: 'Админович',
                phone: '2222222222',
                postIdRecord: admin[0].id_record
            }
        });

        await Employee.findOrCreate({
            where: { login: 'courier' },
            defaults: {
                email: 'courier@example.com',
                password_: await bcrypt.hash('courierpassword', 5),
                name_: 'Курьер',
                lastname: 'Курьеров',
                surname: 'Курьерович',
                phone: '3333333333',
                postIdRecord: courier[0].id_record
            }
        });

        // Создание категорий букетов
        const category1 = await Category.findOrCreate({ where: { title: 'Монобукеты' } });
        const category2 = await Category.findOrCreate({ where: { title: 'Свадебные' } });
        const category3 = await Category.findOrCreate({ where: { title: 'Кустовые розы' } });
        const category4 = await Category.findOrCreate({ where: { title: 'Эко-букеты' } });
        const category7 = await Category.findOrCreate({ where: { title: 'Цветы в коробке' } });
        const category8 = await Category.findOrCreate({ where: { title: 'Цветы в корзине' } });
        const category9 = await Category.findOrCreate({ where: { title: 'Премиум' } });

        // Создание скидок
        await Discount.findOrCreate({ where: { sum: 0, procent: 0 } });
        await Discount.findOrCreate({ where: { sum: 10000, procent: 5 } });
        await Discount.findOrCreate({ where: { sum: 25000, procent: 10 } });
        await Discount.findOrCreate({ where: { sum: 50000, procent: 15 } });

        // Создание цветов
        const flower1 = await Flower.findOrCreate({
            where: { title: 'Пион белый' },
            defaults: {
                quantity: 11,
                price: 400.00,
                season_start: new Date('2024-05-01T00:00:00+04:00'),
                season_end: new Date('2024-08-20T00:00:00+04:00'),
                img: 'd68edc22-e566-4343-9982-ef976cb14988.jpg'
            }
        });

        const flower3 = await Flower.findOrCreate({
            where: { title: 'Гвоздика (Диантус)' },
            defaults: {
                quantity: 50,
                price: 170.00,
                season_start: new Date('2024-01-01T00:00:00+04:00'),
                season_end: new Date('2024-12-31T00:00:00+04:00'),
                img: 'a7a1b18f-060b-4687-888f-c80bd00c8646.jpg'
            }
        });

        const flower5 = await Flower.findOrCreate({
            where: { title: 'Тюльпан' },
            defaults: {
                quantity: 25,
                price: 70.00,
                season_start: new Date('2024-05-23T00:00:00+04:00'),
                season_end: new Date('2024-05-26T00:00:00+04:00'),
                img: 'de04c5eb-6259-45c6-9914-947242bed1fc.jpg'
            }
        });

        const flower6 = await Flower.findOrCreate({
            where: { title: 'Роза' },
            defaults: {
                quantity: 25,
                price: 120.00,
                season_start: new Date('2024-01-01T00:00:00+04:00'),
                season_end: new Date('2024-12-31T00:00:00+04:00'),
                img: 'd12ecc48-7529-443c-a1bb-08e98287257e.jpg'
            }
        });

        const flower27 = await Flower.findOrCreate({
            where: { title: 'Антриннум(Львинный зев)' },
            defaults: {
                quantity: 10,
                price: 400.00,
                season_start: new Date('2024-05-01T00:00:00+04:00'),
                season_end: new Date('2024-09-20T00:00:00+04:00'),
                img: '246c784e-ade1-4e07-bb41-e6e96e6850a2.jpg'
            }
        });


        // Создание букетов
        await Bouquet.findOrCreate({
            where: { title: 'Розы Пинк Мондиаль и цимбидиум' },
            defaults: {
                available: true,
                price: 3450.00,
                description: 'Нежный букет в бело-розовой цветовой гамме, выполненный из самых свежих цветов...',
                img: 'c949513d-9edf-4ac6-accb-e5cd98dacf5b.jpg',
                categoryId: 1 // Пример, замените на соответствующий ID
            }
        });

        await Bouquet.findOrCreate({
            where: { title: 'Ранункулюсы и лизиантус' },
            defaults: {
                available: true,
                price: 9000.00,
                description: 'Нежный букет в бело-розовой цветовой гамме, выполненный из самых свежих цветов...',
                img: 'dabe3c68-bf82-42c0-8e53-ee1980530c92.jpg',
                categoryId: 2 // Пример, замените на соответствующий ID
            }
        });


        // Создание статусов заказов
        await StatusOrder.findOrCreate({ where: { title: 'В обработке' } });
        await StatusOrder.findOrCreate({ where: { title: 'Принят' } });
        await StatusOrder.findOrCreate({ where: { title: 'Отменён' } });
        await StatusOrder.findOrCreate({ where: { title: 'Изготавливается' } });
        await StatusOrder.findOrCreate({ where: { title: 'Готов к доставке' } });
        await StatusOrder.findOrCreate({ where: { title: 'Передан в доставку' } });
        await StatusOrder.findOrCreate({ where: { title: 'Доставлен' } });

        // Создание населенных пунктов
        await Locality.findOrCreate({ where: { title: 'Самара' } });
        await Locality.findOrCreate({ where: { title: 'Новокуйбышевск' } });
        await Locality.findOrCreate({ where: { title: 'Кинель' } });
        await Locality.findOrCreate({ where: { title: 'Красная Глинка' } });
        await Locality.findOrCreate({ where: { title: 'Управленческий' } });
        await Locality.findOrCreate({ where: { title: 'Зубчаниновка' } });
        await Locality.findOrCreate({ where: { title: '16 км' } });

        // Создание категорий упаковки
        const wrapperCategory1 = await WrapperCategory.findOrCreate({ where: { title: 'Бумага' } });
        const wrapperCategory2 = await WrapperCategory.findOrCreate({ where: { title: 'Органза' } });
        const wrapperCategory3 = await WrapperCategory.findOrCreate({ where: { title: 'Фольга' } });
        const wrapperCategory4 = await WrapperCategory.findOrCreate({ where: { title: 'Тишью' } });
        const wrapperCategory5 = await WrapperCategory.findOrCreate({ where: { title: 'Сизаль' } });

        // Создание упаковок
        await Wrapper.findOrCreate({
            where: { title: 'Бежевая упаковка' },
            defaults: {
                price: 200.00,
                img: '91aa7580-7a31-42f5-9bda-e252f86a243b.jpg',
                wrapperCategoryId: wrapperCategory1[0].id
            }
        });

        await Wrapper.findOrCreate({
            where: { title: 'Фетр коричневый' },
            defaults: {
                price: 190.00,
                img: 'a21845d7-7482-4b5b-ae84-84e0ecdb3426.jpg',
                wrapperCategoryId: wrapperCategory3[0].id
            }
        });

        await Wrapper.findOrCreate({
            where: { title: 'Фетр розовый' },
            defaults: {
                price: 100.00,
                img: 'c3877593-e3e7-44bb-b400-8c3cb287194d.jpg',
                wrapperCategoryId: wrapperCategory3[0].id
            }
        });



        console.log('Данные инициализированы успешно');
    } catch (error) {
        console.error('Ошибка при инициализации данных:', error);
    }
};

initData();
