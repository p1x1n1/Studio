const pool = require('./db.pool');  // Подключение к базе данных

async function createFunctionsAndTriggers() {
    const client = await pool.connect();

    try {
        // Создание функции public.update_user_order_sum(), если она не существует
        const checkFunction1 = await client.query(`
            SELECT COUNT(*) 
            FROM pg_proc 
            WHERE proname = 'update_user_order_sum'
        `);

        if (parseInt(checkFunction1.rows[0].count) === 0) {
            // Функция не существует, создаем ее
            await client.query(`
                CREATE OR REPLACE FUNCTION public.update_user_order_sum()
                RETURNS trigger
                LANGUAGE 'plpgsql'
                COST 100
                VOLATILE NOT LEAKPROOF
                AS $BODY$
                BEGIN
                    UPDATE users
                    SET order_sum = users.order_sum + (SELECT price FROM orders WHERE number_order = NEW.number_order)
                    WHERE "login" = NEW."userLogin";
                    
                    RETURN NEW;
                END;
                $BODY$;
            `);
        }

        // Создание функции public.update_users_discountsidrecord(), если она не существует
        const checkFunction2 = await client.query(`
            SELECT COUNT(*) 
            FROM pg_proc 
            WHERE proname = 'update_users_discountsidrecord'
        `);

        if (parseInt(checkFunction2.rows[0].count) === 0) {
            // Функция не существует, создаем ее
            await client.query(`
                CREATE OR REPLACE FUNCTION public.update_users_discountsidrecord()
                RETURNS trigger
                LANGUAGE 'plpgsql'
                COST 100
                VOLATILE NOT LEAKPROOF
                AS $BODY$
                DECLARE
                    discount_id INT;
                BEGIN
                    SELECT id_record INTO discount_id
                    FROM discounts
                    WHERE sum < NEW.order_sum
                    ORDER BY sum DESC
                    LIMIT 1;
                    
                    IF discount_id IS NOT NULL THEN
                        UPDATE users
                        SET "discountIdRecord" = discount_id
                        WHERE login = NEW.login;
                    END IF;
                    
                    RETURN NEW;
                END;
                $BODY$;
            `);
        }

        // Создание функции public.are_all_flowers_in_season(), если она не существует
        const checkFunction3 = await client.query(`
            SELECT COUNT(*) 
            FROM pg_proc 
            WHERE proname = 'are_all_flowers_in_season'
        `);

        if (parseInt(checkFunction3.rows[0].count) === 0) {
            // Функция не существует, создаем ее
            await client.query(`
                CREATE OR REPLACE FUNCTION public.are_all_flowers_in_season(bouquet_id integer)
                RETURNS boolean
                LANGUAGE 'plpgsql'
                COST 100
                VOLATILE PARALLEL UNSAFE
                AS $BODY$
                DECLARE
                    out_of_season_count INTEGER;
                BEGIN
                    -- Подсчет количества цветов, которые не попадают в сезонный промежуток
                    SELECT COUNT(*)
                    INTO out_of_season_count
                    FROM composition_bouquets cb
                    INNER JOIN flowers f ON cb."flowerIdRecord" = f.id_record
                    WHERE cb."bouquetArc" = bouquet_id
                    AND current_timestamp NOT BETWEEN f.season_start AND f.season_end;

                    -- Если out_of_season_count равен 0, значит все цветы попадают в промежуток
                    IF out_of_season_count = 0 THEN
                        RETURN TRUE;
                    ELSE
                        RETURN FALSE;
                    END IF;
                END;
                $BODY$;
            `);
        }

        // Создание триггера для update_user_order_sum, если он не существует
        const checkTrigger1 = await client.query(`
            SELECT COUNT(*) 
            FROM pg_trigger 
            WHERE tgname = 'update_order_sum'
        `);

        if (parseInt(checkTrigger1.rows[0].count) === 0) {
            // Триггер не существует, создаем его
            await client.query(`
                CREATE TRIGGER update_order_sum
                AFTER UPDATE OF "statusOrderIdRecord"
                ON public.orders
                FOR EACH ROW
                WHEN (NEW."statusOrderIdRecord" = 2)
                EXECUTE FUNCTION public.update_user_order_sum();
            `);
        }

        // Создание триггера для update_users_discountsidrecord, если он не существует
        const checkTrigger2 = await client.query(`
            SELECT COUNT(*) 
            FROM pg_trigger 
            WHERE tgname = 'update_discountsidrecord'
        `);

        if (parseInt(checkTrigger2.rows[0].count) === 0) {
            // Триггер не существует, создаем его
            await client.query(`
                CREATE TRIGGER update_discountsidrecord
                AFTER UPDATE OF order_sum
                ON public.users
                FOR EACH ROW
                EXECUTE FUNCTION public.update_users_discountsidrecord();
            `);
        }

        console.log('Функции и триггеры успешно созданы (или уже существуют)');
    } catch (err) {
        console.error('Ошибка при создании функций и триггеров:', err);
    } finally {
        client.release();
    }
}

createFunctionsAndTriggers();
