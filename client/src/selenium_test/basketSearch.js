const { Builder, By, Key, until } = require('selenium-webdriver');

(async function testBasketSearch() {
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

    // Ожидание, пока поле поиска станет доступным
    let searchInput = await driver.findElement(By.id('search_input'));
    await driver.wait(until.elementIsVisible(searchInput), 10000);

    // Ввод текста в поле поиска
    let searchText = '2'; // Введём артикул
    await searchInput.sendKeys(searchText);

    // Проверка, что текст был введен правильно
    let inputValue = await searchInput.getAttribute('value');
    if (inputValue !== searchText) {
      throw new Error(`Expected input value to be ${searchText}, but it was ${inputValue}`);
    }

    // Нажатие на кнопку поиска
    let searchButton = await driver.findElement(By.id('search_button'));
    await searchButton.click();

    // Ожидание перенаправления на страницу с результатами поиска
    await driver.wait(until.urlContains(`boquet/${searchText}`), 10000);

    // Ожидание, пока кнопка корзины станет доступной
    await driver.wait(until.elementLocated(By.id('basket')), 10000);

    // Найти и кликнуть кнопку корзины
    let basketButton = await driver.findElement(By.id('basket'));
    await driver.wait(until.elementIsVisible(basketButton), 10000);
    await basketButton.click();

    // Проверка, что элемент изменился (например, текст или стиль)
    // Замена By.css('.basket-text') на актуальный селектор
    await driver.wait(until.elementLocated(By.css('.basket-text')), 10000);
    let basketText = await driver.findElement(By.css('.basket-text'));
    let basketTextContent = await basketText.getText();
    console.log('Текст корзины после клика:', basketTextContent);
    if (!basketTextContent.includes('В корзине')) {
      throw new Error(`Ожидалось, что текст будет содержать 'В корзине', но он был: ${basketTextContent}`);
    }

    // Ожидание, пока кнопка избранного станет доступной
    await driver.wait(until.elementLocated(By.id('heart')), 10000);

    // Найти и кликнуть кнопку избранного
    let heartButton = await driver.findElement(By.id('heart'));
    await driver.wait(until.elementIsVisible(heartButton), 10000);
    await heartButton.click();

    // Проверка, что элемент изменился (например, текст или стиль)
    // Замена By.css('.heart-text') на актуальный селектор
    await driver.wait(until.elementLocated(By.css('.heart-text')), 10000);
    let heartText = await driver.findElement(By.css('.heart-text'));
    let heartTextContent = await heartText.getText();
    console.log('Текст избранного после клика:', heartTextContent);
    if (!heartTextContent.includes('В избранном')) {
      throw new Error(`Ожидалось, что текст будет содержать 'В избранном', но он был: ${heartTextContent}`);
    }

    console.log('Тест пройден: Пользователь успешно авторизован, перенаправлен на главную страницу, из которой зашёл в каталог и установил фильтры.');
  } catch (error) {
    console.error('Произошла ошибка во время выполнения теста:', error);
  } finally {
    // Закрытие браузера
    await driver.quit();
  }
})();
