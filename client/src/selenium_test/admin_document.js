const { Builder, By, Key, until } = require('selenium-webdriver');

(async function testAdminDocument() {
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
  await loginInput.sendKeys('abazina'); // Ввод логина
  // Заполнение поля пароля
  let passwordInput = await driver.findElement(By.id('pass'));
  await passwordInput.sendKeys('abazina'); // Ввод пароля
  // Нажатие на кнопку 'Войти'
  let authButton = await driver.findElement(By.id('AuthButton'));
  await authButton.click();

  // Ожидание загрузки NavBar
  await driver.wait(until.elementLocated(By.css('.navbar')), 10000);
  // Ожидание загрузки элемента корзины
  let cabinet = await driver.wait(until.elementLocated(By.id('cabinet')), 10000);
  await cabinet.click();

   // Ожидание загрузки кнопки заказа
   let otchet = await driver.wait(until.elementLocated(By.id('otchet')), 10000);

   // Клик по кнопке заказа
   await otchet.click();
   
    // Выберите начальную дату
    let startDate = await driver.findElement(By.id('startDate')).click();
    await startDate.sendKeys('2024-02-02');

    // Выберите конечную дату
    let endDate = await driver.findElement(By.id('endDate')).click();
    await endDate.sendKeys('2024-06-02');

    // Нажмите кнопку для генерации отчета
    await driver.findElement(By.id('salesButton')).click();

    // Ожидание результата (например, проверка загрузки документа)
    //await driver.wait(until.alertIsPresent(), 10000);

    // // Проверка успешного сообщения
    // let alert = await driver.switchTo().alert();
    // let alertText = await alert.getText();
    // if (alertText.includes('Статус заказа')) {
    //   console.log('Тест пройден: Сообщение об успешной смене статуса заказа появилось.');
    // } else {
    //   console.log('Тест не пройден: Сообщение об успешной смене статуса заказа не появилось.');
    // }
    // await alert.accept();

  } finally {
    // Закрытие браузера
    await driver.quit();
  }
})();
