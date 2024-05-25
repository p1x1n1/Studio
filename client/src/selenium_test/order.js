const { Builder, By, Key, until } = require('selenium-webdriver');


(async function testAuthComponent() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Открытие страницы авторизации
    await driver.get('http://localhost:3000/login'); // Убедитесь, что URL правильный

    // Ожидание, пока поле логина станет доступным
    await driver.wait(until.elementLocated(By.id('login')), 10000);

    // Удаление overlay, если он существует
    await driver.executeScript(`
      let overlay = document.getElementById('webpack-dev-server-client-overlay');
      if (overlay) {
        overlay.style.display = 'none';
      }
    `);

    // Заполнение поля логина
    let loginInput = await driver.findElement(By.id('login'));
    await loginInput.sendKeys('p1x1n1'); // Ввод логина

    // Заполнение поля пароля
    let passwordInput = await driver.findElement(By.id('pass'));
    await passwordInput.sendKeys('p1x1n1'); // Ввод пароля

    // Нажатие на кнопку 'Войти'
    let authButton = await driver.findElement(By.id('AuthButton'));
    await authButton.click();

    // Ожидание перенаправления и проверки
    await driver.wait(until.elementLocated(By.id('bouquet')), 10000);

    // Ожидание загрузки NavBar
    await driver.wait(until.elementLocated(By.css('.navbar')), 10000);

    // Ожидание загрузки элемента корзины
    let basketButton = await driver.wait(until.elementLocated(By.id('baskets')), 10000);

    // Клик по кнопке корзины
    await basketButton.click();

    // Ожидание загрузки кнопки заказа
    let orderButton = await driver.wait(until.elementLocated(By.id('order')), 10000);

    // Клик по кнопке заказа
    await orderButton.click();
    
      // Заполнение формы заказа
      await driver.wait(until.elementLocated(By.id('locality')), 5000);
      await driver.findElement(By.id('locality')).sendKeys('Самара', Key.RETURN);

      await driver.wait(until.elementLocated(By.id('street')), 5000);
      await driver.findElement(By.id('street')).sendKeys('Краснодонская', Key.RETURN);

      await driver.findElement(By.id('house')).sendKeys('11a');

      await driver.findElement(By.id('delivery')).sendKeys('Самовывозом', Key.RETURN);

      let datePicker = await driver.findElement(By.id('date-picker'));
      await datePicker.sendKeys('2024-06-01');

      let timePicker = await driver.findElement(By.id('time-picker'));
      await timePicker.sendKeys('12:00');

      let phoneInput = await driver.findElement(By.id('phoneR'));
      await phoneInput.sendKeys('+79998887766');

      let submitButton = await driver.findElement(By.id('basket'));
      await driver.executeScript("arguments[0].click();", submitButton);

      // Ожидание подтверждения заказа
      await driver.wait(until.elementLocated(By.css('.d-glex h1')), 15000);


  } catch (error) {
    console.error('Произошла ошибка во время выполнения теста:', error);
  } finally {
    // Закрытие браузера
    await driver.quit();
  }
})();
